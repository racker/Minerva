import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { LabelService } from 'src/app/_services/labels/label.service';
import { MonitorCreatePage } from './monitor-create.page';
import { SharedModule } from 'src/app/_shared/shared.module';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { LabelMock } from 'src/app/_mocks/labels/label.service.mock';
import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';
import {routes } from '../../monitors.routes';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from '../../monitors.module';
import ajv from 'ajv';
import { MonitorsPage } from '../monitors/monitors.page';
import { MarkFormGroupTouched } from 'src/app/_shared/utils';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/_models/resources';
import { AdditionalSettingsComponent } from '../../components/additional-settings/additional-settings.component';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';

const keyPair = {
  keysandvalues: [
  {
    key: 'newkey',
    value: 'newpair'
  },
  {
    key: 'likelykey',
    value: 'likelypair'
  },
  {
    key: 'somekey',
    value: 'somepair'
  },
  {
    key: 'fourthkey',
    value: 'fourthpair'
  }
]};
describe('MonitorCreatePage', () => {
let injector: TestBed;
let component: MonitorCreatePage;
let fixture: ComponentFixture<MonitorCreatePage>;
let schemaService: SchemaService;
let monitorService: MonitorService;
let spySubManager;
let spyMonitorService;
const addSettingsForm = jasmine.createSpyObj('AdditionalSettingsComponent', ['value']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MonitorCreatePage,
        MonitorsPage,
        DynamicFormComponent,
        AdditionalSettingsComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{path: 'monitors', component: MonitorsPage}]
        ),
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            root: {
              routeConfig : routes[0]
            }
          }
        },
        MonitorService,
        LabelService,
        SchemaService,
        DurationSecondsPipe,
        { provide: AJV_CLASS, useValue: ajv },
        { provide: AJV_CONFIG, useValue: { useDefaults: true } },
        {
          provide: AJV_INSTANCE,
          useFactory: createAjvInstance,
          deps: [AJV_CLASS, AJV_CONFIG]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    schemaService = injector.get(SchemaService);
    monitorService = injector.get(MonitorService);
    fixture = TestBed.createComponent(MonitorCreatePage);
    component = fixture.componentInstance;
    schemaService.loadSchema();
    spySubManager = spyOn(component.subManager, 'add');
    spyMonitorService = spyOn(monitorService, 'createMonitor');
    component.additionalSettingsForm = addSettingsForm;
    fixture.detectChanges();
  });

  afterEach(() => {
    monitorService.monitor = undefined;
    monitorService.monitors = undefined;
  });

  // create reusable function for a dry spec.
  function updateForm(name, type) {
    component.createMonitorForm.controls['name'].setValue(name);
    component.createMonitorForm.controls['type'].setValue(type);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should setup defaults', () => {
    expect(component['labelSubmit']).toBeDefined();
    expect(component['labelFormValid']).toBeDefined();
    expect(component['dynamicFormSubmit']).toBeDefined();
    expect(component['dynamicFormValid']).toBeDefined();
    expect(component.addMonLoading).toEqual(false);
    expect(component.updatedLabelFields).toBeDefined();
    expect(component.subManager).toBeDefined();
    expect(component.dynaConfig).toBeDefined();
    expect(component.listOfKeys).toBeDefined();
    expect(component.listOfValues).toBeDefined();
    expect(component.typesOfMonitors).toBeDefined();
    expect(component.selectedMonitor).toBeDefined();
    expect(component.markFormGroupTouched).toEqual(MarkFormGroupTouched);
    expect(component.mf).toBeDefined();
    expect(component.additionalSettings).toEqual('out');
    expect(component.resources$).toEqual(new Observable<Resource[]>());
  });

  it('should get monitor form (mf) and return createMonitorForm controls', () => {
    expect(Object.keys(component.mf).length).toEqual(2);
  });

  it('should be invalid createMonitorForm', () => {
    updateForm('coolName', '');
    expect(component.createMonitorForm.valid).toEqual(false);
  });

  it('should be valid createMonitorForm', () => {
    updateForm('coolName', 'cpu');
    expect(component.createMonitorForm.valid).toEqual(true);
  });

  it('should update labels from add-fields component', () => {
    const formattedKeyPair = {
      newkey: 'newpair',
      likelykey: 'likelypair',
      somekey: 'somepair',
      fourthkey: 'fourthpair'
    };
    component.labelsUpdated(keyPair);
    expect(component.updatedLabelFields).toEqual(formattedKeyPair);
  });

  it('should add typesOfMonitors', () => {
    expect(component.monitors[0].type).toEqual('Local');
  });

  it('should add listOfKeys & listOfValues', () => {
    expect(component.listOfKeys).toEqual(Object.keys(new LabelMock().resourceLabels));
    expect(component.listOfValues).toEqual(Object.values(new LabelMock().resourceLabels).flat());
  });

  it('should add 3 subscriptions to subManager', () => {
    updateForm('coolName', 'cpu');
    expect(spySubManager).toHaveBeenCalledTimes(3);
  });

  it('should addMonitor() using service', () => {
    component.selectedMonitor = 'Cpu';
    component.dynaConfig = {
      monitorType: 'Local',
      zones: [],
      fields: [
        {
          type: "checkbox",
          label: "CPU Percentage",
          name: "percpu",
          value: true
        }, {
          type: "checkbox",
          label: "Total CPU",
          name: "totalcpu",
          value: true
        }]
    };
    fixture.detectChanges();
    async() => {
      updateForm('coolName', 'cpu');
      await component.addMonitor();
      expect(monitorService.createMonitor).toHaveBeenCalled();
    };
  });

  it('should make selectedMonitor equal to dropdown selection', () => {
    component.loadMonitorForm('Disk');
    expect(component.selectedMonitor).toEqual('Disk');
  });

  it('should loadMonitorForm()', () => {
    component.loadMonitorForm('Disk');
    expect(JSON.stringify(component.dynaConfig))
    .toEqual(`{"monitorType":"Local","fields":[{"type":"input","label":"mount","name":"mount","inputType":"text","validations":[{"name":"required","message":"mount Required"},{"name":"pattern","message":"mount format incorrect"},{"name":"minimum","message":"mount must be at least 1 character(s)"}]}]}`)
  });

  it('should change additional settings value', ()=> {
    component.showAdditionalSettings();
    expect(component.additionalSettings).toEqual('in');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subManager.unsubscribe).toHaveBeenCalled();
  });

  it('should convert numeric intervals to ISO Durations', () => {
    component.selectedMonitor = 'Ping';
    component.loadMonitorForm(component.selectedMonitor);
    component.createMonitorForm.value.interval = 120;
    component.createMonitorForm.value['details'] = {
        type: 'remote',
        plugin: {
          type: 'ping',
          target: "192.168.0.1",
          pingInterval: 60,
          timeout: 120
        }
    };
    component.parseInISO();
    expect(component.createMonitorForm.value.interval).toEqual('PT2M');
    expect(component.createMonitorForm.value['details'].plugin.pingInterval).toEqual('PT1M');
    expect(component.createMonitorForm.value['details'].plugin.timeout).toEqual('PT2M');
  });
});
