import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { ValidateResource } from '../../../../_shared/validators/resourceName.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Resource, CreateResource, Resources } from 'src/app/_models/resources';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { mergeUniqueObjectsOfArray, isAdmin } from 'src/app/_shared/utils';
import { IfStmt, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-resourceslist',
  templateUrl: './resourceslist.component.html',
  styleUrls: ['./resourceslist.component.scss']
})
export class ResourcesListComponent implements OnInit, OnDestroy {
  @ViewChild('delResourceLink') delResource:ElementRef;
  @ViewChild('confirmResource') confirmResource:ElementRef;
  @ViewChild('addResButton', { static: true }) addButton:ElementRef;
  private ngUnsubscribe = new Subject();
  searchPlaceholderText: string;
  modalType : string = 'delResourceModal';
  message   : string = 'Are you sure you want to delete selected resource?';
  confirmMessageSuccess : string = "";
  confirmMessageError : string = "";
  
  resources: Resource[];
  total: number;
  page: number = 0;
  progressVal: number = 0;
  defaultVal: number = 20;
  
  defaultAmount: number = environment.pagination.pageSize;
  totalPages: number;
  fetchResources: any;
  addResLoading: boolean = false;
  disableOk: boolean = true;  
  selectedResources: any = [];
  resourceArr:any = [];
  resourceErrArr:any = [];
  addResourceForm: FormGroup;
  constructor(private resourceService: ResourcesService,
    private validateResource: ValidateResource, private fb: FormBuilder,
    private router: Router, private spnService: SpinnerService, private logService: LoggingService) {     
      this.spnService.changeLoadingStatus(true);
      }

  ngOnInit() {
    this.fetchResources = () => {
      return this.resourceService.getResources(this.defaultAmount, this.page)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(() => {
          this.resources = this.resourceService.resources.content;
          this.total = this.resourceService.resources.totalElements;
          this.searchPlaceholderText = `Search ${this.total} Resources`;
          this.spnService.changeLoadingStatus(false);
        });
    }
    this.fetchResources();
    // popover form for adding a Resource
    this.addResourceForm = this.fb.group({
      name: ['', Validators.required],
      enabled: ['']
    });
  }

  isAdminRoute(recourceId) {
    return isAdmin(this.router) ? `/admin/resources/${recourceId}`  : `/resources/${recourceId}`
  }

  /**
   * @description check column event for items in tables, selects resource item
   * @param event any
   * @returns void
   */
  checkColumn(event):void {
    if (event.target.checked) {
      this.selectedResources = this.resources.map(x => Object.assign({}, x));
    }
    else {
      this.selectedResources = [];
    }
    this.resources.forEach(e => {
      e["checked"] = event.target.checked;
    });
  }
  /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
  goToPage(n: number): void {
    this.page = n;
    this.fetchResources();
  }
  /**
   * @description <app-pagination>
   */
  nextPage(): void {
    this.page++;
    this.fetchResources();
  }
  /**
   * @description <app-pagination>
   */
  prevPage(): void {
    this.page--;
    this.fetchResources();
  }
  /**
   * @description Add selected resources to an array for actions
   * @param resource Resource
   */
  selectResource(resource:Resource):void {
    if (this.selectedResources.indexOf(resource) === -1) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(
        this.selectedResources.indexOf(resource), 1
      );
    }
  }
/**
 * @description Adds a resource after validating resource id
 * @param resourceForm FormGroup
 * @returns void
*/
  addResource(resourceForm: FormGroup):void {
    if (resourceForm.controls['name'].value) {
      this.addResLoading = true;
      // check if the resourceId can be be used & is valid
      this.validateResource.valid(resourceForm.controls['name'].value)
        .subscribe((response) => {
        this.addResLoading = false;
          // if status of request is 200 the resourceId is taken and cannot be used
          if (response.status === 200) {
            resourceForm.controls['name'].setErrors({ 'invalidResourceName': true });
          }
        }, error => {
          // if status of request is 404 the resourceId was not found and can be used
          if ((error.status === 404)) {
            let resource: CreateResource = {
              resourceId: resourceForm.controls['name'].value,
              presenceMonitoringEnabled: resourceForm.controls['enabled'].value ? true : false
            }
            this.resourceService.createResource(resource).subscribe((result) => {
              this.addResLoading = false;
              this.router.navigate(['/resources', result.resourceId]);
            }, error => {
              this.addResLoading = false;
              this.logService.log(JSON.stringify(error), LogLevels.error)
            }
            )
          }
          else {
            this.addResLoading = false;
            this.logService.log(`Resource could not be added`, LogLevels.error);
          }
        })
    }
  }

  /**
   * Tells us when a search is in progress
   * @param searching boolean
   */
  resourcesSearch(searching:boolean): void {
    if (searching) {
      this.spnService.changeLoadingStatus(true);
    }
    else {
      this.spnService.changeLoadingStatus(false);
    }
  }

  /**
   * Reset search back to its original results
   */
  resetSearch(): void {
    this.resources = this.resourceService.resources.content;
    this.total = this.resourceService.resources.totalElements;
  }

  /**
   * Function to accept event emitted from search
   * @param resources Resources
   */
  resourceResults(resources: Resources): void {
    this.resources = mergeUniqueObjectsOfArray(resources.content,
      this.selectedResources, "resourceId");
    this.total =  this.resources.length;
  }

  /**
   * @description function called when to close confirmation modal as customer don't want to delete selected resources.
   * @param flag 
   * 
   */

  triggerClose(flag) {
    if(flag)
    this.delResource.nativeElement.click();
  }

  /**
   * @description function called when to close progress bar modal by click on OK button.
   * open and close attributes are used to open and close modal.
   * 
   */

  triggerOk() {
    this.confirmResource.nativeElement.removeAttribute("open");   
    this.confirmResource.nativeElement.setAttribute("close", "true");
    this.fetchResources();
    this.resourceArr    = [];
    this.resourceErrArr = [];
  }


  /**
   * @description Function called after confirm delete. selectedResources are list of resources selected for deletion.
   * resourceErrArr for storing ids which are already deleted or not found.
   * confirmMessageError and confirmMessageSuccess fields are showing success and error messages.
   * 
   */

  triggerConfirm() {
    this.confirmMessageSuccess = "";
    this.delResource.nativeElement.click();
    this.selectedResources.forEach((element) => {
      var id = this.resourceService.deleteResourcePromise(element.resourceId).catch(err => {
        this.resourceErrArr.push(element.resourceId);    
      });
      this.resourceArr.push(id);
      this.callPromiseAll(this.resourceArr, this.resourceErrArr);
    })
  }


  /**
   * @description called function to get response of all resource request which is selected for deletion.
   * @param resourceArr 
   * @param resourceErrArr 
   */
  callPromiseAll(resourceArr, resourceErrArr) {
    Promise.all(resourceArr)
    .then(data => {
     // empty success and error string before append text to it.
      this.confirmMessageSuccess  = "";
      this.confirmMessageError    = "";     
        for(var i=0; i < data.length; i++) {
          if(resourceErrArr.indexOf(this.selectedResources[i].resourceId) != -1) 
            this.confirmMessageError += this.selectedResources[i].resourceId + " Failed!" + "\n";          
          else 
            this.confirmMessageSuccess += this.selectedResources[i].resourceId + " is deleted successfully!" + "\n";
            this.progressVal = ((i + 1) * 100) / data.length;
          if(i === data.length - 1)
            this.disableOk  = false;
        }
    })
    .catch(err =>  { 
        this.confirmMessageError += 'Failed!';          
    });
    this.confirmResource.nativeElement.setAttribute("open", "true");
  }



  ngOnDestroy() {
    //unsubcribe once component is done
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}