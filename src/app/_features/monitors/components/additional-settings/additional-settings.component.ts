import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Monitor } from 'src/app/_models/monitors';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { Observable, Subscription } from 'rxjs';
import { Resource } from 'src/app/_models/resources';
import { map } from 'rxjs/operators';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { CntrlAttribute } from '../../mon.utils';

/**
 * Rules of AdditionalSettingsComponent
 * 1. Selecting a ResourceId disables excluded resources
 * 2. Selecting a ResourceId disables Label Selector
 * 3. resourceIdEmit emits whether ResourceId is selected
 */

@Component({
  selector: 'monitor-additional-settings',
  templateUrl: './additional-settings.component.html',
  styleUrls: ['./additional-settings.component.scss']
})
export class AdditionalSettingsComponent implements OnInit {

  @Input()
  initialData: Monitor;

  @Input()
  disabled: boolean = false;

  // Output emitters will update the components as to changes in the form
  // and whether they are valid
  @Output()
  public resourceIdEmit = new EventEmitter<boolean>();

  resources$: Observable<Resource[]>;
  subManager = new Subscription();

  updateSettingForm: FormGroup;

  get value() {

    let formExport = Object.assign({}, this.updateSettingForm.value);
    if (formExport.resourceId) {
      delete formExport.excludedResourceIds
    }
    else {
      delete formExport.resourceId;
      let excluded = [];
      formExport.excludedResourceIds.map((item) => {
        console.log('**excludedResourceId Object: ', item);
        if (item['resource'] != "") {
          console.log("**Adding resource: ", item['resource']);
          excluded.push(item['resource']);
        }
      });
      formExport[CntrlAttribute.excludedResourceIds] = excluded;
    }

    return formExport;

    /*
 Object.keys(addFormValue).map((value) => {
        let updateObject;
        if (value === 'excludedResourceIds') {
          let excluded = [];
          Object.keys(addFormValue[value]).map((item) => {
            if (addFormValue[value][item] != "") {
              excluded.push(addFormValue[value][item].resource);
            }
          });
          updateObject = { op: "replace", patch: `/${value}`, value: excluded };
        }
        else {
          updateObject = { op: "replace", patch: `/${value}`, value: `${addFormValue[value]}` };
        }
        updateBody.push(updateObject);

    */
  }

  /**
   * @description used here to get the formarray and add inputs to it
   * @returns FormArray
   */
  get resourceDropdowns(): FormArray {
    return this.updateSettingForm.get('excludedResourceIds') as FormArray;
  }

  constructor(private fb: FormBuilder, private pipeSeconds: DurationSecondsPipe,
    private resourceService: ResourcesService) { }

  ngOnInit(): void {

    let interval = this.pipeSeconds.transform(this.initialData.interval);

    this.updateSettingForm = this.fb.group({
      interval: new FormControl(interval),
      excludedResourceIds: this.fb.array([]),
      labelSelectorMethod: new FormControl(this.initialData.labelSelectorMethod),
      resourceId: new FormControl(this.initialData.resourceId)
    });

    this.resources$ = this.resourceService.resourceItems.pipe(
      map((items) => {
        return items;
      })
    );

    let resourceSub = this.resourceService.getResources(25, 0).subscribe();
    if (this.initialData.excludedResourceIds.length > 0) {
      Object.keys(this.initialData.excludedResourceIds).map(key => {
        let value = this.initialData.excludedResourceIds[key];
        this.resourceDropdowns.push(this.fb.group({
          resource: new FormControl(value)
        }));
      });
    }
    else {
      this.resourceDropdowns.push(this.fb.group({
        resource: new FormControl('')
      }));
    }
    this.subManager.add(resourceSub);
  }

   /**
   * @description Add a new Row
   */
  addExcludedResource(): void {
    this.resourceDropdowns.push(this.createItem());
  }

  /**
   * @description Removes the row
   * @param index number
   */
  deleteExcludedResource(index:number): void {
    this.resourceDropdowns.removeAt(index);
  }

  /**
   * Returns the total of dropdowns
   * @returns number
   */
  totalItems(): number {
    return this.resourceDropdowns.length;
  }

  /**
   * @description Creates a new dropdown input
   */
  createItem(): FormGroup {
    return this.fb.group({
      resource: new FormControl('')
    });
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
