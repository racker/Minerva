import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/_shared/animations';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { Monitor, Label } from 'src/app/_models/monitors';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { MonitorUtil, CntrlAttribute } from '../../mon.utils';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { finalize, tap } from 'rxjs/operators';
import { FieldSet } from '../../interfaces/field.interface';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AdditionalSettingsComponent } from '../../components/additional-settings/additional-settings.component';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { transformKeyPairs } from 'src/app/_shared/utils';
import { LabelService } from 'src/app/_services/labels/label.service';
import { AddFieldsComponent } from 'src/app/_shared/components/add-fields/add-fields.component';


declare const window: any;
export enum UpdateSection {
  additional = "additional",
  name = "name",
  label = "label",
  plugin = "plugin"
}

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-details.page.html',
  styleUrls: ['./monitor-details.page.scss'],
  animations: [
    Animations.slideUpDownTrigger
  ]
})
export class MonitorDetailsPage implements OnInit {
  id: string;
  dynamicFormSubmit: Subject<void> = new Subject<void>();
  dynamicFormValid: Subject<boolean> = new Subject<boolean>();
  public labelsSubmit: Subject<void> = new Subject<void>();
  public labelFormSubmit: Subject<boolean> = new Subject<boolean>();
  public resetLabelSubject: Subject<{[key:string]: any}> = new Subject<{[key:string]: any}>();
  @ViewChild(DynamicFormComponent) subForm: DynamicFormComponent;
  @ViewChild(AddFieldsComponent) labelsForm: AddFieldsComponent;
  @ViewChild(AdditionalSettingsComponent) additionalSettingsForm: AdditionalSettingsComponent;
  monitorUpdateLoad: boolean;
  @ViewChild('monitorPopup') monitorPopPencil: ElementRef;
  @ViewChild('updateMonPen') updateMonNamePencil:ElementRef;
  @ViewChild('pencilAddSettings') updateSettingPencil: ElementRef;

  @ViewChild('delMonLink') delMonitor: ElementRef;
  @ViewChild('delMonitorFail') delMonitorFailure: ElementRef;
  @ViewChild('updateLabelPen') labelPopPencil:ElementRef;
  monId: string;
  message: string = "Are you sure you'd like to delete this Monitor?";
  modalType:string;
  header:string;
  error:string;

  monitor$: Observable<Monitor>;
  Object = window.Object;
  additionalSettings: string = 'out';
  gc = new Subscription();
  deleteLoading: boolean = false;
  isUpdtPnlActive = false;
  updateMonNameLoading: boolean = false;
  updateAdditionalLoading:boolean = false;
  definitions:any;
  monitorTypeTitle:any;

  dynaConfig: FieldSet;
  monDetails: Monitor;

  additionalSettingEdit = false;
  updateMonNameForm: FormGroup;
  udpateSettingForm: FormGroup;
  formatProp=[];

  updateBody = [];
  monitorUtil = MonitorUtil;
  updatedLabelFields: any;
  labelsLoading:boolean = false;
  listOfKeys = [];

  listOfValues = [];
  monLabels: Label;
  constructor(private route: ActivatedRoute, private router: Router,private readonly schemaService: SchemaService,
    private fb: FormBuilder, private monitorService: MonitorService, private spnService: SpinnerService,
    private pipeSeconds: DurationSecondsPipe, private labelService: LabelService) {
      this.spnService.changeLoadingStatus(true);
     }

  ngOnInit() {
    // popover form for updating Monitor name
    this.updateMonNameForm = this.fb.group({
      name: ['']
    });

    this.udpateSettingForm = this.fb.group({
      interval: [''],
      excludedResourceIds: this.fb.array([this.fb.group({
        resource: new FormControl('')})]),
      labelSelectorMethod: [''],
      resourceId: ['']
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.monitor$ = this.monitorService.getMonitor(this.id).pipe(
        tap((data) => {
          this.monDetails = data;
          this.setDefinition();
          this.monLabels = data.labelSelector;
          this.spnService.changeLoadingStatus(false);
          this.updateMonNameForm.controls['name'].setValue(this.monDetails.name ||
            this.monitorUtil.formatSummaryField(this.monDetails));
        })
      );
    });

    this.gc.add(this.labelService.getResourceLabels().subscribe(data => {
      this.listOfKeys = Object.keys(this.labelService.labels);
      this.listOfValues = Object.values(this.labelService.labels).flat();
    }));

    this.gc.add(this.labelFormSubmit.subscribe((valid) => {
      if (!valid) {
        this.labelsLoading = false;
      }
      else {
        let patchBody = [{op: "replace", path: `/labelSelector`, value: this.updatedLabelFields }];
        this.monitorUpdate(patchBody, UpdateSection.label);
      }
    }));

    this.gc.add(this.dynamicFormValid.subscribe((valid) => {
        if (valid) {
          let updateBody = this.pluginProps(this.subForm);
          if (updateBody.length > 0) {
            this.monitorUpdate(updateBody, UpdateSection.plugin);
          } else {
            this.monitorUpdateLoad = false;
            this.isUpdtPnlActive = false;
          }
        } else{
          this.monitorUpdateLoad=false;
          throw "Form is not valid!";
        }
      })
    );
  }

   /**
   * @description parse interval numeric time values and convert to ISO Duration
   */
  setDefinition(): void {
    for (const key of Object.keys(this.schemaService.schema.definitions)) {
      let schemaItem=this.schemaService.schema.definitions[key];
      if (schemaItem.title === this.monDetails.details.plugin.type) {
        this.definitions = schemaItem;
        this.monitorTypeTitle=schemaItem.title;
      }
    }
  }

/**
 * Check timeduration field
 * @param pluginField
 */
  isTimeduration(pluginField){
    if(pluginField){
      if (this.definitions.properties[pluginField].hasOwnProperty(CntrlAttribute.format))
      if (this.monDetails.details.plugin.hasOwnProperty(pluginField)) {
       return true
      }
    }
    return false;
  }

   /**
   * cancel function to close popup using reference of helix modal
   * @param message any
   */

  triggerClose(flag:boolean) {
    if(flag)
    this.delMonitor.nativeElement.click();
    else
    this.delMonitorFailure.nativeElement.click();
  }

   /**
   * confirmation function to get consent from user to delete selected monitor or not?
   * @param id string
   */

  triggerConfirm(id: string):void {
    this.deleteLoading = true;
    this.monitorService.deleteMonitor(id).subscribe((resp) => {
      this.deleteLoading = false;
      if (resp.status === 204) {
        this.router.navigate(['/monitors']);
      }
      else {
        this.delMonitor.nativeElement.click();
        this.delMonitorFailure.nativeElement.click();
      }
    }, () => {
      this.deleteLoading = false;
      this.delMonitor.nativeElement.click();
      this.delMonitorFailure.nativeElement.click();
    });

  }

  /**
   * Update Monitors plugin details
   * @param updateBody any
   * @param updateSection string - section of the monitor being updated
   */
  monitorUpdate(updateBody:any, updateSection: string) {
    let updateFields;
    if(updateSection === 'label')
      updateFields = { 'labelSelector': this.updatedLabelFields}
    else
    updateFields = updateBody;
    this.monitorService.updateMonitor(this.id, updateFields).pipe(
      finalize(() => {
        this.monitorUpdateLoad=false;
        this.updateMonNameLoading = false;
        this.additionalSettingEdit = false;
        this.updateAdditionalLoading = false;
        this.labelsLoading = false;
      })
    ).subscribe(data =>{
      this.monitor$ = of<Monitor>(this.monitorService.monitor).pipe(
        tap((data) => {
          this.monDetails = data;
        })
      );
      switch(updateSection) {
        case UpdateSection.plugin:
          this.monitorUpdateLoad=false;
          this.isUpdtPnlActive=false;
          break;
        case UpdateSection.name:
          this.updateMonNameLoading = false;
          this.updateMonNamePencil.nativeElement.click();
          break;
        case UpdateSection.additional:
          this.additionalSettingEdit = false;
          this.updateAdditionalLoading = false;
          break;
        case UpdateSection.label:
          this.labelsLoading = false;
          this.labelPopPencil.nativeElement.click();
          break;
      }
    });
  }

  /**
   * Create patch objects to update monitor plugin
   * IF it plugin value is belong to datetime "format" then convet into seconds and match with form value
   * else match defualt value form value
   */
  pluginProps(form): any[] {
    let patchBody = [];
    let formValue = form.value;
    let formZones = form.monitoringZones;
    Object.keys(formValue).forEach(item => {
      if (this.formatProp.filter(a => a === item).length > 0) {
        let second = this.pipeSeconds.transform(this.monDetails.details.plugin[item]);
        if (second !== formValue[item]) {
          patchBody.push({ op: "replace", path: `/details/plugin/${item}`, value: formValue[item] });
        }
      } else if (this.monDetails.details.plugin[item] !== formValue[item]) {
        patchBody.push({ op: "replace", path: `/details/plugin/${item}`, value: formValue[item] });
      }
    });

    if (this.monDetails.details.type === "remote" &&
    JSON.stringify(formZones) != JSON.stringify(this.monDetails.details.monitoringZones)) {
      patchBody.push({ op: "replace", path: "/details/monitoringZones", value: formZones});
    }

    return patchBody;
  }

  pencilClick() {
    this.creatDynamicConfig();
    this.isUpdtPnlActive = true;
  }

  /**
   * Update Monitor name function
   * @param monitorName FormGroup
   */
  updateMonitorName(monitorName: FormGroup) {
    this.updateMonNameLoading = true;
    let patchBody = [{op: "replace", path: `/name`, value: monitorName.value.name }];
    this.monitorUpdate(patchBody, UpdateSection.name);
  }

  /**
   * Update Monitor additional settings
   * @param settingsForm FormGroup
   */
  updateMonitorSettings() {
    this.updateAdditionalLoading = true;
    this.updateBody = [];
    let addForm = Object.assign({}, this.additionalSettingsForm.value);
    Object.keys(addForm).map((value) => {
      if (value === 'interval') {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: addForm[value]});
      }
      else if (value === 'excludedResourceIds') {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: addForm[value]});
        this.updateBody.push({ op: "replace", path: `/${CntrlAttribute.resourceId}`, value: null});

        if (this.monDetails.labelSelector === ("" || null)) {
          this.updateBody.push({ op: "replace", path: `/${CntrlAttribute.labelSelector}`, value: {}});
        }
      }
      else if (value === 'resourceId') {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: `${addForm[value]}`});
        this.updateBody.push({ op: "replace", path: `/${CntrlAttribute.labelSelector}`, value: null});
        this.updateBody.push({ op: "replace", path: `/${CntrlAttribute.excludedResourceIds}`, value: []});
      }
      else {
        this.updateBody.push({ op: "replace", path: `/${value}`, value: `${addForm[value]}`});
      }
    });

    this.monitorUpdate(this.updateBody, UpdateSection.additional);
  }

  /**
   * Open additional settings panel
   */
  modifySettings() {
    this.additionalSettings = 'in';
    this.additionalSettingEdit = true;
  }

  /**
   * Toggle additional settings panel
   */
  additionlSettingClick(){
    this.additionalSettings = this.additionalSettings === 'in' ? 'out': 'in';
  }

  /**
   * Get monitor type and creat and dynamic form as per Moniotor type
   * @param monitor
   */
  creatDynamicConfig() {
    let keys = Object.keys(this.schemaService.schema.definitions);
    for (let index = 0; index < keys.length; index++) {
      const element = this.schemaService.schema.definitions[keys[index]];
      if (element.title === this.monDetails.details.plugin.type) {
        let definitions = this.setDefaultValue(element);
        this.dynaConfig = {
          monitorType: this.monDetails.details.type === 'remote' ? 'Remote' : 'Local',
          zones: this.monDetails.details.monitoringZones,
          fields: MonitorUtil.CreateMonitorConfig(definitions)
        }
        return;
      }
    }
  }

  /**
   * Set Default value for dynamic form
   * @param definitions
   */
  setDefaultValue(definitions) {
    Object.keys(definitions.properties).forEach(prop => {
      if (definitions.properties[prop].hasOwnProperty(CntrlAttribute.format)) {
        if (this.monDetails.details.plugin[prop]) {
          this.formatProp.push(prop);
          definitions.properties[prop].default = this.pipeSeconds.transform(this.monDetails.details.plugin[prop]);
        }
      } else {
        definitions.properties[prop].default = this.monDetails.details.plugin[prop];
      }
    }
    )
    return definitions;
  }

  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param labelValues {[key: string] : any}
   */
  labelsUpdated(labelValues: {[key: string] : any}): void {
    this.updatedLabelFields = transformKeyPairs(labelValues.keysandvalues);
  }

  ngOnDestroy() {
    this.gc.unsubscribe();
  }

}
