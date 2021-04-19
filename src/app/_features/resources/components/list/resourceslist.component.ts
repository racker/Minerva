import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ResourcesService } from '@minerva/_services/resources/resources.service';
import { ValidateResource } from '@minerva/_shared/validators/resourceName.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Resource, CreateResource, Resources } from '@minerva/_models/resources';
import { Router } from '@angular/router';
import { SpinnerService } from '@minerva/_services/spinner/spinner.service';
import { LoggingService } from '@minerva/_services/logging/logging.service';
import { LogLevels } from '@minerva/_enums/log-levels.enum';
import { mergeUniqueObjectsOfArray, isAdmin } from '@minerva/_shared/utils';
import { EnvironmentConfig } from '@minerva/_services/config/environmentConfig.service';


@Component({
  selector: 'app-resourceslist',
  templateUrl: './resourceslist.component.html',
  styleUrls: ['./resourceslist.component.scss']
})
export class ResourcesListComponent implements OnInit, OnDestroy {
  @ViewChild('delResourceLink') delResource:ElementRef;
  @ViewChild('confirmResource') confirmResource:ElementRef;
  @ViewChild('addResButton', { static: true }) addButton:ElementRef;
  @ViewChild('chkColumnRs') chkColumnRs:ElementRef;
  private ngUnsubscribe = new Subject();
  searchPlaceholderText: string;
  modalType : string = 'delResourceModal';
  message   : string = 'Are you sure you want to delete selected resource?';
  confirmMessageSuccess : string = "";
  confirmMessageError : string = "";

  resources: Resource[];
  failedResources:any = [];
  total: number;
  page = 0;
  sorting = "";
  progressVal = 0;
  defaultVal = 20;
  successCount = 0;
  defaultAmount: number;
  totalPages: number;
  fetchResources: any;
  addResLoading = false;
  isDescending = true;
  disableOk = true;
  isSearching = false;
  selectedResources: any = [];
  selectedResForDeletion:any = [];
  resourceArr:any = [];
  addResourceForm: FormGroup;
  constructor(private resourceService: ResourcesService,
    private validateResource: ValidateResource,
    private fb: FormBuilder,
    private router: Router, private spnService: SpinnerService,
    private logService: LoggingService, private env: EnvironmentConfig) {
      this.spnService.changeLoadingStatus(true);
      this.defaultAmount= env.pagination.pageSize;
      }

  ngOnInit() {
    this.fetchResources = () => {
      return this.resourceService.getResources(this.defaultAmount, this.page, this.sorting)
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
   * @description sort resources used for sorting the resource list by passing params this.sorting.
   * @param orderBy string
   * @param sortBy string
  */
  sortResources(orderBy, sortBy) {
      this.isDescending = !this.isDescending;
      if(this.isSearching) {
        this.resources = this.resources.reverse();
      } else {
        this.sorting = sortBy + ',' + orderBy;
        this.fetchResources();
        this.spnService.changeLoadingStatus(true);
      }
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
  selectResource(resource:Resource) {
    if (this.checkExist(this.selectedResources, resource.resourceId) === false) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(
        this.selectedResources.findIndex(value => value.resourceId === resource.resourceId), 1
      );
    }
  }

  checkExist(arr, id) {
    const found = arr.some(el => el.resourceId === id);
    return found;
  }

/**
 * @description Adds a resource after validating resource id
 * @param resourceForm FormGroup
 * @returns void
*/
  addResource(resourceForm: FormGroup):void {
    if (resourceForm.controls['name'].value) {
      this.addResLoading = true;
      // check if the resourceId can be  be used & is valid
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
            this.resourceService.createResource(resource).pipe(
              finalize(() => {
                this.addResLoading = false;
              })
            ).subscribe((result) => {
              this.addResLoading = false;
              this.router.navigate(['/resources', result.resourceId]);
            })
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
    this.isSearching = false;
  }

  /**
   * Function to accept event emitted from search
   * @param resources Resources
   */
  resourceResults(resources: Resources): void {
    this.resources = mergeUniqueObjectsOfArray(resources.content,
      this.selectedResources, "resourceId");
    this.total =  this.resources.length;
    this.isSearching = true;
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
    if(this.chkColumnRs.nativeElement.checked)
    this.reset();
    this.confirmResource.nativeElement.removeAttribute("open");
    this.confirmResource.nativeElement.setAttribute("close", "true");
    this.selectedResources.map(item => {
      this.resources = this.resources.filter(a => a.resourceId !== item.resourceId);
    });
    this.selectedResources = [];
    this.fetchResources();
    if(this.failedResources.length > 0) {
      this.failedResources.join(' , ');
      this.logService.log(this.failedResources + ' failed deletion', LogLevels.error);
    }
    this.successCount = 0;
  }

  reset() {
    this.resources.forEach(e => {
      if(e.checked)
        e.checked = false;
      });
      this.chkColumnRs.nativeElement.checked = false;

  }

  /**
   * @description Function called after confirm delete. selectedResources are list of resources selected for deletion.
   * resourceErrArr for storing ids which are already deleted or not found.
   * confirmMessageError and confirmMessageSuccess fields are showing success and error messages.
   *
   */

  triggerConfirm() {
    this.selectedResForDeletion = [];
    this.disableOk              = true;
    this.delResource.nativeElement.click();
    let d = 0;
    this.selectedResources.forEach((element, index) => {
      var id = this.resourceService.deleteResourcePromise(element.resourceId).then((resp) => {
        this.successCount++;
        this.progressBar(index++, {resource:this.resources.filter(a => a.resourceId === element.resourceId)[0], error: false});

      })
      .catch(err => {
        this.failedResources.push(element.resourceId);
        this.progressBar(index++, {resource:this.resources.filter(a => a.resourceId === element.resourceId)[0], error: false});

      });
      this.resourceArr.push(id);

    })
    Promise.all(this.resourceArr)
    .then(data => {
      this.disableOk  = false;
      this.confirmResource.nativeElement.setAttribute("open", "true");
    });
  }

  progressBar(d, obj:any) {
    this.progressVal = (d * 100) / this.selectedResForDeletion.length;
    this.selectedResForDeletion.push(obj);
  }

  ngOnDestroy() {
    //unsubcribe once component is done
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}