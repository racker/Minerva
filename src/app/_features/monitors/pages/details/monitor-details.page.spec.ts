import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ajv from 'ajv';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../../_shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MonitorsPage } from '../monitors/monitors.page';
import { MonitorService } from '../../../../_services/monitors/monitor.service'
import { MonitorDetailsPage } from './monitor-details.page';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { MonitorslistComponent } from '../../components/list/monitorslist.component';
import { routes } from '../../monitors.routes';
import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from '../../monitors.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { MonitorUtil } from '../../mon.utils';

describe('MonitorDetailComponent', () => {
  let injector: TestBed;
  let component: MonitorDetailsPage;
  let monitorService: MonitorService;
  let fixture: ComponentFixture<MonitorDetailsPage>;
  let schemaService: SchemaService;
  let definitions= {properties:{
    "type": {
      "type": "string",
      "enum": [
        "net_response"
      ],
      "default": "net_response"
    },
    "protocol": {
      "type": "string",
      "enum": [
        "udp",
        "tcp"
      ]
    },
    "host": {
      "type": "string",
      "pattern": "^.*\\S+.*$",
      "minLength": 1
    },
    "port": {
      "type": "integer",
      "minimum": 1,
      "maximum": 65535
    },
    "timeout": {
      "type": "string",
      "format": "date-time"
    },
    "readTimeout": {
      "type": "string",
      "format": "date-time"
    },
    "send": {
      "type": "string"
    },
    "expect": {
      "type": "string"
    }
  }};

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

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MonitorsPage,
        MonitorslistComponent,
        MonitorDetailsPage,
        DynamicFormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: "anUniqueId"}),
            root: {
              routeConfig : routes[0]
            }
          }
        },
        MonitorService,
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
    monitorService = injector.get(MonitorService);
    schemaService = injector.get(SchemaService);
    fixture = TestBed.createComponent(MonitorDetailsPage);
    schemaService.loadSchema();
    component = fixture.componentInstance;
    component.updateMonNameForm = formBuilder.group({
      name: ['']
    });
    fixture.detectChanges();
    component.monDetails = new monitorsMock().single;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.monitor$).toBeDefined();
    expect(component.Object).toEqual(Object);
    expect(component.deleteLoading).toEqual(false);
    expect(component.delMonitor).toBeDefined();
    expect(component.delMonitorFailure).toBeDefined();
    expect(component.additionalSettings).toEqual('out');
    expect(component.isUpdtPnlActive).toEqual(false);
    expect(component.updateMonNameLoading).toEqual(false);
    expect(component.updateAdditionalLoading).toEqual(false);
    expect(component.additionalSettingEdit).toEqual(false);
    expect(component.labelsLoading).toEqual(false);
    expect(component.formatProp).toEqual([]);
    expect(component.updateBody).toEqual([]);
    expect(component.listOfKeys).toBeDefined();
    expect(component.listOfValues).toBeDefined();
    expect(component.monitorUtil).toEqual(MonitorUtil);
  });

  it('should set mondetails to monitor', ()=> {
      expect(component.monDetails).toEqual(new monitorsMock().single);
  });

  it('should set to a single monitor', (done) => {
    component.monitor$.subscribe((monitor) => {
      expect(monitor).toEqual(new monitorsMock().single);
      done();
    });
  });

  it('should add all subscriptions', ()=> {
    let spy = spyOn(component.gc, 'add');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should delete a monitor', (done) => {
    let spy = spyOn(monitorService, 'deleteMonitor').and.returnValue(of());
    component.deleteMonitor('monitorID8772');
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should declare Object', () => {
    expect(component.Object).toEqual(Object);
  });
  it('should initialize the dynamic config object', (done)=>{
    ["cpu","net_response",].forEach(element => {
      component.monDetails.details.plugin.type=element;
      component.creatDynamicConfig();
      expect(component.dynaConfig.monitorType).toEqual('Local');
      expect(component.dynaConfig.fields.length).toBeGreaterThan(1);
      done();
    });
  });

  it('should set default values to dynamic component',(done)=>{

    let def=component.setDefaultValue(definitions);
    expect(def.properties.timeout.default).toBe(400);
    done();
  });
  it('should create plugin data if format type field value get change', (done) => {
    let form = {
      value: {
        host: "rackspace.com",
        port: 6000,
        protocol: "udp",
        readTimeout: "1000",
        send: "testing",
        timeout: "400"
      }
    }
    component.formatProp = ["timeout", "readTimeout"];
    let res = component.pluginProps(form);
    expect(res[0].value).toBe(form.value.readTimeout);
    done();
  })
  it('should create plugin data without format type field', (done) => {
    let form = {
      value: {
        host: "rackspace1.com",
        port: 6000,
        protocol: "udp",
        readTimeout: "123",
        send: "testing",
        timeout: "400"
      }
    }
    component.formatProp = ["timeout", "readTimeout"];
    let res = component.pluginProps(form);
    expect(res[0].value).toBe(form.value.host);
    done();
  });

  it('should update Monitor name', () => {
    let spyCompMethod = spyOn(component, 'monitorUpdate');
    component.updateMonitorName(component.updateMonNameForm);
    expect(spyCompMethod).toHaveBeenCalled();
  });

  it('should toggle additonal settings panel', () => {
    component.additionalSettings = 'out';
    component.additionlSettingClick();
    expect(component.additionalSettings).toEqual('in');
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

  it('should have timeduration field',done =>{
    var istimeduration=component.isTimeduration("timeout");
    expect(istimeduration).toBe(true);
    done();
  });
  it('should not have timeduration field',done =>{
    var istimeduration=component.isTimeduration("expect");
    expect(istimeduration).toBe(false);
    done();
  });

  it('should modifySettings()', () => {
    component.modifySettings();
    expect(component.additionalSettings).toEqual('in');
    expect(component.additionalSettingEdit).toEqual(true);
  });

  it('should update label selector', () => {
    let spy = spyOn(component, 'monitorUpdate');
    component['labelsSubmit'].next();
    expect(spy).toHaveBeenCalled();
  });

  it('should excute Monitor update service', () => {
    let spyService = spyOn(monitorService, 'updateMonitor')
    .and.returnValue(of(new monitorsMock().single));
    component.monitorUpdate([], 'name');
    expect(spyService).toHaveBeenCalled();
  });


  it('should unsubscribe on ngOnDestroy',done =>{
    spyOn(component.gc, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.gc.unsubscribe).toHaveBeenCalled();
    done();
  });
});
