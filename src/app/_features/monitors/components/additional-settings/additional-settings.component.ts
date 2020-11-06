import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Monitor } from 'src/app/_models/monitors';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { Subscription } from 'rxjs';
import { Resource } from 'src/app/_models/resources';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { CntrlAttribute } from '../../mon.utils';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

/**
 * Rules of AdditionalSettingsComponent
 * 1. Selecting a ResourceId disables excluded resources
 * 2. Selecting a ResourceId disables Label Selector
 * 3. resourceIdEmit emits whether ResourceId is selected
 *
 * Rules of API
 * 1. Patch with resourceId cannot include excludedResourceIds
 * 2. Patch with resourceId must nullify labelSelector
 * 3. Patch with excludedResourceIds property cannot include resourceId
 */

@Component({
  selector: 'monitor-additional-settings',
  templateUrl: './additional-settings.component.html',
  styleUrls: ['./additional-settings.component.scss']
})
export class AdditionalSettingsComponent implements OnInit {

  @Input()
  initialData: Monitor;

  // Output emitters will update the components as to changes in the form
  // and whether they are valid
  @Output()
  public resourceIdEmit = new EventEmitter<boolean>();

  resources: Resource[] = [];
  page: number = 0;
  sorting: string = "";

  defaultAmount: number;

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
        if (item['resource'] != "") {
          excluded.push(item['resource']);
        }
      });
      formExport[CntrlAttribute.excludedResourceIds] = excluded;
    }

    Object.keys(formExport).forEach((key) => {
      if (formExport[key] === null || formExport[key] === '') { delete formExport[key] }
    });

    return formExport;
  }

  /**
   * @description used here to get the formarray and add inputs to it
   * @returns FormArray
   */
  get resourceDropdowns(): FormArray {
    return this.updateSettingForm.get('excludedResourceIds') as FormArray;
  }

  constructor(private fb: FormBuilder,
    private pipeSeconds: DurationSecondsPipe,
    private logService: LoggingService,
    private resourceService: ResourcesService,
    envr: EnvironmentConfig) {
    this.defaultAmount = envr.pagination.pageSize;
  }
  ngOnInit(): void {
    if (this.initialData) {
      this.formWithInitialData();
    }
    else {
      this.formWithEmptyValues();
    }
    this.getResoure();
  }

  /**
   * @description get Resource
   * @param 25 list only
   */
  getResoure() {
    this.resourceService.getResources(this.defaultAmount, this.page, this.sorting).subscribe(
      (data) => {
        this.resources = this.resources.concat(data.content);
      },
      (error) => {
        this.logService.log(error, LogLevels.error);
      });
  }

  /**
   * @description creat empty form
   */
  formWithEmptyValues() {
    this.updateSettingForm = this.fb.group({
      interval: new FormControl(''),
      excludedResourceIds: this.fb.array([]),
      labelSelectorMethod: new FormControl(''),
      resourceId: new FormControl('')
    });

    this.resourceDropdowns.push(this.createItem());
  }
  /**
   * @description fill form with initial data
   */
  formWithInitialData() {
    let interval = this.pipeSeconds.transform(this.initialData.interval);
    this.updateSettingForm = this.fb.group({
      interval: new FormControl(interval),
      excludedResourceIds: this.fb.array([]),
      labelSelectorMethod: new FormControl(this.initialData.labelSelectorMethod),
      resourceId: new FormControl(this.initialData.resourceId || "")
    });

    if (this.initialData.excludedResourceIds.length > 0) {
      Object.keys(this.initialData.excludedResourceIds).map(key => {
        let value = this.initialData.excludedResourceIds[key];
        this.resourceDropdowns.push(this.fb.group({
          resource: new FormControl(value)
        }));
      });
    }
    else {
      this.resourceDropdowns.push(this.createItem());
    }
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
  deleteExcludedResource(index: number): void {
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
}
