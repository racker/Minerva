import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { MonitorService } from 'src/app/_services/monitors/monitor.service.js';
import { LabelService } from 'src/app/_services/labels/label.service';
import { SchemaService } from 'src/app/_services/monitors/schema.service';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../interfaces/field.interface';
import { transformKeyPairs } from 'src/app/_shared/utils';
import { MonotorUtil,CntrlAttribute } from '../../mon.utils';
import { MarkFormGroupTouched } from "src/app/_shared/utils";
import { config as MonitorConfigs } from '../../config/index';
import { Animations } from 'src/app/_shared/animations';
import { Resource } from 'src/app/_models/resources';
import { duration } from "moment";
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { map } from 'rxjs/operators';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { AddFieldsComponent } from 'src/app/_shared/components/add-fields/add-fields.component';
import { AdditionalSettingsComponent } from '../../components/additional-settings/additional-settings.component';


@Component({
  selector: 'app-monitor-create',
  templateUrl: './monitor-create.page.html',
  styleUrls: ['./monitor-create.page.scss'],
  animations: [ Animations.slideUpDownTrigger ]
})
export class MonitorCreatePage implements OnInit, OnDestroy {
  public labelSubmit: Subject<void> = new Subject<void>();
  private labelFormValid: Subject<boolean> = new Subject<boolean>();
  private dynamicFormSubmit: Subject<void> = new Subject<void>();
  private dynamicFormValid: Subject<boolean> = new Subject<boolean>();

  createMonitorForm: FormGroup;
  addMonLoading: boolean = false;
  updatedLabelFields: {[key: string] : any} = null;
  subManager = new Subscription();
  dynaConfig: FieldConfig[] = [];
  listOfKeys = [];
  listOfValues = [];
  monitors: [{type?:string,monitor?:string[]}];
  typesOfMonitors: string []=[];
  selectedMonitor = null;
  markFormGroupTouched = MarkFormGroupTouched;
  additionalSettings: string = 'out';
  resources$ = new Observable<Resource[]>();

change = false;
  // #ngForm reference needed for view
  get mf() { return this.createMonitorForm.controls; }

  // viewchild for dynamic sub form for monitors
  @ViewChild(DynamicFormComponent) subForm: DynamicFormComponent;

  @ViewChild(AddFieldsComponent) labelSelectorForm: AddFieldsComponent;
  @ViewChild(AdditionalSettingsComponent, { static: true }) additionalSettingsForm: AdditionalSettingsComponent;
  constructor(private monitorService: MonitorService, private fb: FormBuilder,
    private labelService: LabelService, private router: Router, private readonly schemaService: SchemaService,
    private resourceService: ResourcesService, private logService: LoggingService) {
    }

    ngOnInit() {
      this.groupingMonitor();
      let labelServiceSub = this.labelService.getResourceLabels().subscribe(data => {
        this.listOfKeys = Object.keys(this.labelService.labels);
        this.listOfValues = Object.values(this.labelService.labels).flat();
      });

      this.createMonitorForm = this.fb.group({
        name: [''],
        type: ['', Validators.required]
      });

      let labelFormSubscrip = this.labelFormValid.subscribe((valid) => {
        if (!valid) {
          this.addMonLoading = false;
        }
        else {
          this.dynamicFormSubmit.next();
        }
      });

      let subFormValidSubscrip = this.dynamicFormValid.subscribe((valid) => {
        if (!valid) {
          this.addMonLoading = false;
        }
        else {
          this.addMonitor();
        }
      });

      this.subManager.add(labelServiceSub);
      this.subManager.add(labelFormSubscrip);
      this.subManager.add(subFormValidSubscrip);
  }

  groupingMonitor() {
        let lclMonitor:string[] = this.schemaService.schema.definitions
      .LocalMonitorDetails.properties.plugin.oneOf.map(a => a.$ref.replace("#/definitions/", ''));
        this.monitors = [{ type: 'Local', monitor: lclMonitor.sort() }];
    let rmtMonitor:string[] = this.schemaService.schema.definitions
      .RemoteMonitorDetails.properties.plugin.oneOf.map(a => a.$ref.replace("#/definitions/", ''));
    this.monitors.push({ type: 'Remote', monitor: rmtMonitor.sort() });
  }


/**
 * @description Create a Monitor
 * @param monitorForm FormGroup
*/
  addMonitor(): void {

    // If form is invalid return
    if (!this.createMonitorForm.valid) {
      this.addMonLoading = false;
      return;
    }

    // add selector label fields
    if (!this.additionalSettingsForm.value.hasOwnProperty(CntrlAttribute.resourceId)) {
      this.createMonitorForm.value['labelSelector'] = this.updatedLabelFields || {};
    }
    else {
      delete this.createMonitorForm.value['labelSelector'];
    }

    this.createMonitorForm.value['details'] = {
      type: MonitorConfigs[this.selectedMonitor].type,
      plugin: {
        type: MonotorUtil.ParseMonitorTypeEnum(this.schemaService.schema.definitions[this.selectedMonitor]),
        ...(this.subForm.value)
      }
    };

    // delete drop down selection value, it's not needed
    delete this.createMonitorForm.value[CntrlAttribute.type];
    let monitorForm = Object.assign(this.createMonitorForm.value, this.additionalSettingsForm.value);

    this.parseInISO();
    const result = this.schemaService.validateData(monitorForm);
    if (result.isValid) {
      this.monitorService.createMonitor(monitorForm).subscribe(data => {
        this.addMonLoading = false;
        this.router.navigate(['/monitors']);
      }, (error) => {
        this.addMonLoading = false;
        this.logService.log(`Create monitor failed - ${JSON.stringify(error)}`, LogLevels.error)
      });
    }
    else {
      this.logService.log(`Monitor data invalid - ${result.errorsText}`, LogLevels.error)
      this.addMonLoading = false;
    }
  }

  /**
   * @description parse interval numeric time values and convert to ISO Duration
   */
  parseInISO(): void {
    let definitions = this.schemaService.schema.definitions[this.selectedMonitor]
    for (var pr in this.schemaService.schema.definitions[this.selectedMonitor].properties) {
      if (definitions.properties[pr].hasOwnProperty(CntrlAttribute.format))
        if (this.createMonitorForm.value.details.plugin.hasOwnProperty(pr)) {
          this.createMonitorForm.value.details.plugin[pr] = duration(parseInt(this.createMonitorForm.value.details.plugin[pr]), 'seconds').toISOString();
        }
    }

    if (this.createMonitorForm.value.hasOwnProperty(CntrlAttribute.interval)) {
      this.createMonitorForm.value.interval = duration(parseInt(this.createMonitorForm.value.interval), 'seconds').toISOString()
    }
  }

  /**
   * @description Whenever updates are made to the form we retrieve values here
   * @param metaValues {[key: string] : any}
  */
  labelsUpdated(metaValues: {[key: string] : any}):void {
    this.updatedLabelFields = transformKeyPairs(metaValues.keysandvalues);
  }

  /**
   * @description loads the appropriate monitor form based on selection
   * @param value dropdown selection event.target.value
   */
  loadMonitorForm(value: any) {
    
    this.selectedMonitor = value;
    if(this.selectedMonitor){
      let definitions = this.schemaService.schema.definitions[this.selectedMonitor];
      this.dynaConfig = MonotorUtil.CreateMonitorConfig(definitions);
    }else{
      this.dynaConfig=null;
    }

    
  }

  /**
   * Toggles div for showing additional settings & gets list of resources
   */
  showAdditionalSettings(): void {
    this.additionalSettings = this.additionalSettings === 'in' ? 'out': 'in';
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
