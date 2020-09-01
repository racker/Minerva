import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { Observable, Subject, Subscription } from 'rxjs';
import  { transformKeyPairs } from '../../../../_shared/utils';
import { Resource } from 'src/app/_models/resources';
import { environment } from '../../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';

declare const window: any;
@Component({
  selector: 'app-resource-details.page',
  templateUrl: './resource-details.page.html',
  styleUrls: ['./resource-details.page.scss']
})
export class ResourceDetailsPage implements OnInit {

  @ViewChild('metapop') metaPopPencil:ElementRef;
  @ViewChild('labelpop') labelPopPencil:ElementRef;
  @ViewChild('delResLink') delResource:ElementRef;
  @ViewChild('delResourcepop') delResourcePop: ElementRef;
  id: string;
  message: string;
  modalType:string;

  resource$: Observable<Resource>;
  private metaSubmit: Subject<void> = new Subject<void>();
  private labelsSubmit: Subject<void> = new Subject<void>();
  private metaFormSubmit: Subject<boolean> = new Subject<boolean>();
  private labelFormSubmit: Subject<boolean> = new Subject<boolean>();
  subManager = new Subscription();

  Object = window.Object;
  metaLoading:boolean = false;
  labelsLoading:boolean = false;
  deleteLoading:boolean = false;
  updatedMetaFields: {[key: string] : any};
  updatedLabelFields: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private resourceService: ResourcesService, private spnService: SpinnerService) { this.spnService.changeLoadingStatus(true); }

  // TODO(optional): attempt to move this logic to a route resolve as opposed
  // to connecting the subscription to the request within the component
  ngOnInit() {
    this.message = "Are you sure you'd like to delete this Resource?";
    this.modalType = 'delResModal';
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.resource$ = this.resourceService.getResource(this.id).pipe(
        tap(() => {
          this.spnService.changeLoadingStatus(false);
        })
      );
    });

    let metaFormSubscrip = this.metaFormSubmit.subscribe((valid) => {
      if (!valid) {
        this.metaLoading = false;
      }
      else {
        this.finalizeMeta();
      }
    });

    let labelFormSubscrip = this.labelFormSubmit.subscribe((valid) => {
      if (!valid) {
        this.labelsLoading = false;
      }
      else {
        this.finalizeLabels();
      }
    });

    this.subManager.add(metaFormSubscrip);
    this.subManager.add(labelFormSubscrip);
  }

  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param metaValues {[key: string] : any}
   */
  metaValueUpdated(metaValues: {[key: string] : any}):void {
    this.updatedMetaFields = transformKeyPairs(metaValues.keysandvalues);
  }

  /**
   * @description When fields are valid we then make the request to the server
   * and tie it the subscription of the resource$ being used in the template
   */
  finalizeMeta() {
    this.updatedMetaFields = { 'metadata': this.updatedMetaFields};
    this.resource$ = this.resourceService.updateResource(this.resourceService.resource.resourceId,
      this.updatedMetaFields).pipe(
        tap(x => {
          this.metaLoading = false
        })
      )
  }

  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param labelValues {[key: string] : any}
   */
  labelsUpdated(labelValues: {[key: string] : any}): void {
    this.updatedLabelFields = transformKeyPairs(labelValues.keysandvalues);
  }

  /**
   * @description When fields are valid we then make the request to the server
   */
  finalizeLabels() {
    this.updatedLabelFields = { 'labels': this.updatedLabelFields};
    this.resource$ = this.resourceService.updateResource(this.resourceService.resource.resourceId,
      this.updatedLabelFields).pipe(
        tap(x => {
          this.labelsLoading = false
        })
      );
  }

  /**
   * cancel function to close popup using reference of helix modal
   * @param message any
   */

  triggerClose(message) {
    this.delResource.nativeElement.click();
  }

  /**
   * confirmation function to get consent from user to delete selected resource or not?
   * @param id string
   */

  triggerConfirm(id: string):void {
    this.deleteLoading = true;
    this.resourceService.deleteResource(id).subscribe(() => {
        this.deleteLoading = false;
        this.router.navigate(['/resources']);
    }, () => {
      this.deleteLoading = false;
      this.delResource.nativeElement.click();
      this.delResourcePop.nativeElement.click();
    });
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
