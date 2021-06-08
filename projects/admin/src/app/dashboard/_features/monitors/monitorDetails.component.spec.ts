import { CUSTOM_ELEMENTS_SCHEMA, Inject, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ajv, { Ajv } from 'ajv';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';


import { MonitorDetailsComponent } from './monitorDetails.component';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';


import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';

import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { MonitorsPage } from 'src/app/_features/monitors/pages/monitors/monitors.page';
import { MonitorslistComponent } from 'src/app/_features/monitors/components/list/monitorslist.component';
import { DynamicFormComponent } from 'src/app/_features/monitors/components/dynamic-form/dynamic-form.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from 'src/app/_features/monitors/monitors.module';
import { routes } from 'src/app/_features/monitors/monitors.routes';
import { MonitorUtil } from 'src/app/_features/monitors/mon.utils';
import { LabelService } from 'src/app/_services/labels/label.service';
import { LabelMock } from 'src/app/_mocks/labels/label.service.mock';
import { LabelResources, LabelMonitors } from 'src/app/_models/labels';
import { Schema, Monitor } from 'src/app/_models/monitors';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
class LabelServiceMock {

  public _labels;

  get labels() {
    return this._labels;
  }

  set labels(value: any) {
    this._labels = value;
  }
  getResourceLabels(): Observable<LabelResources> {
    this._labels = new LabelMock().resourceLabels;
    return of<LabelResources>(new LabelMock().resourceLabels);

  }
  getMonitorLabels(): Observable<LabelMonitors> {
    return of<LabelMonitors>(new LabelMock().monitorLabels);

  }
}
@Injectable({
  providedIn: 'root'
})
class ShcemaServiceMock {
  private _schema: Schema;

  get schema(): Schema {
    return this._schema;
  }

  set schema(scheme: Schema) {
    this._schema = scheme;
  }

  loadSchema(): Promise<Schema | boolean> {
    return new Promise((res, rej) => {
      this._schema = new monitorsMock().schema;
      this._schema['$id'] = this._schema.$schema;
      delete this._schema.$schema;
      res(this._schema);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
class MonitorServiceMock {

  deleteMonitor(id: string): Observable<any> {

    return of<boolean>(true);
  }
  getMonitor(id: string): Observable<Monitor> {
    return of<Monitor>(new monitorsMock().single).pipe(delay(500));
  }

  updateMonitor(id: string, details: any[]): Observable<Monitor> {
    return of<Monitor>(new monitorsMock().single);
  }
}

describe('MonitorDetailsComponent', () => {
  let injector: TestBed;
  let component: MonitorDetailsComponent;
  let monitorService: MonitorService;
  let lbelServiceMock: LabelService;
  let fixture: ComponentFixture<MonitorDetailsComponent>;
  let schemaService: SchemaService;
  let definitions = {
    properties: {
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
        "format": "date-time",
        "default": 400,
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
    }
  };

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
    ]
  };

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MonitorsPage,
        MonitorslistComponent,
        MonitorDetailsComponent,
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
            params: of({ id: "anUniqueId" }),
            root: {
              routeConfig: routes[0]
            }
          }
        },
        MonitorService,
        SchemaService,
        LabelService,
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
  });

  beforeEach(() => {
    TestBed.overrideComponent(MonitorDetailsComponent,
      {
        set: {
          providers: [
            { provide: LabelService, useClass: LabelServiceMock },
            { provide: MonitorService, useClass: MonitorServiceMock },
            { provide: SchemaService, useClass: ShcemaServiceMock }
          ]
        }
      }
    )
    fixture = TestBed.createComponent(MonitorDetailsComponent);
    component = fixture.componentInstance;
    component.updateMonNameForm = formBuilder.group({
      name: ['']
    });
    monitorService = fixture.debugElement.injector.get(MonitorService);
    lbelServiceMock = fixture.debugElement.injector.get(LabelService);
    schemaService = fixture.debugElement.injector.get(SchemaService);
    schemaService.loadSchema();

    component.monDetails = new monitorsMock().single;
    component.definitions = definitions;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should setup defaults', () => {

    expect(component.monitor$).toBeDefined();
    expect(component.Object).toEqual(Object);
    expect(component.deleteLoading).toEqual(false);
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

  it('should set mondetails to monitor', (done) => {
    fixture.whenStable().then(() => {

      expect(component.monDetails).toEqual(new monitorsMock().single);
      done();
    });
  });

  it('should set to a single monitor', (done) => {
    component.monitor$.subscribe((monitor) => {
      expect(monitor).toEqual(new monitorsMock().single);
      done();
    });
  });

  it('should add all subscriptions', () => {
    let spy = spyOn(component.gc, 'add');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should delete a monitor', (done) => {
    let spy = spyOn(monitorService, 'deleteMonitor').and.returnValue(of());
    component.triggerConfirm('monitorID8772');
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should declare Object', () => {
    expect(component.Object).toEqual(Object);
  });
  it('should initialize the dynamic config object', (done) => {
    ["cpu", "net_response",].forEach(element => {
      component.monDetails.details.plugin.type = element;
      component.creatDynamicConfig();
      expect(component.dynaConfig.monitorType).toEqual('Local');
      expect(component.dynaConfig.fields.length).toBeGreaterThan(1);
      done();
    });
  });

  it('should set default values to dynamic component', (done) => {

    let def = component.setDefaultValue(definitions);
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

  it('should have timeduration field', done => {
    var istimeduration = component.isTimeduration("timeout");
    expect(istimeduration).toBe(true);
    done();
  });
  it('should not have timeduration field', done => {
    var istimeduration = component.isTimeduration("expect");
    expect(istimeduration).toBe(false);
    done();
  });

  it('should modifySettings()', () => {
    component.modifySettings();
    expect(component.additionalSettings).toEqual('in');
    expect(component.additionalSettingEdit).toEqual(true);
  });

  // it('should update label selector', () => {
  //   let spy = spyOn(component, 'monitorUpdate');
  //   component.labelsSubmit.next();
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should excute Monitor update service', () => {
    let spyService = spyOn(monitorService, 'updateMonitor')
      .and.returnValue(of(new monitorsMock().single));
    component.monitorUpdate([], 'name');
    expect(spyService).toHaveBeenCalled();
  });


  it('should unsubscribe on ngOnDestroy', done => {
    spyOn(component.gc, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.gc.unsubscribe).toHaveBeenCalled();
    done();
  });
});
