import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from '../dynamic-field/dynamic-field.directive';
import { InputComponent } from '../input/input.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectComponent } from '../select/select.component';
import { ZoneService } from 'src/app/_services/zones/zones.service';
import { HttpClientModule } from '@angular/common/http';
import { envConfig, EnvironmentConfig } from 'src/app/_services/featureConfig/environmentConfig.service';

describe('DynamicFormComponent', () => {
  let injector: TestBed;
  let component: DynamicFormComponent;
  let zoneService: ZoneService;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formValidSub: Subject<void> = new Subject<void>();


  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        DynamicFormComponent,
        DynamicFieldDirective,
        InputComponent,
        CheckboxComponent,
        SelectComponent
  ],
  providers: [
    ZoneService,
    {
      provide: APP_INITIALIZER,
      useFactory: envConfig,
      deps: [ EnvironmentConfig ],
      multi: true
  }
  ]
}) // overrideModule for adding entryComponents to Testbed
  .overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: [
        InputComponent,
        CheckboxComponent,
        SelectComponent
      ]
    }
  }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    zoneService = injector.get(ZoneService);
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({});
    component.validateForm = formValidSub.asObservable();
    component.config = {
      monitorType: "Remote",
      zones: ["zone_1", "zone_2", "zone_3"],
      fields: [
      {
        type: "input",
        label: "Username",
        inputType: "text",
        name: "name",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Name Required"
          },
          {
            name: "pattern",
            validator: Validators.pattern("^[a-zA-Z]+$"),
            message: "Accept only text"
          }
        ]
      },
      {
        type: "checkbox",
        label: "Accept Terms",
        name: "term",
        value: true
      },
      {
        type: "select",
        label: "Country",
        name: "country",
        value: "UK",
        options: ["India", "UAE", "UK", "US"]
      }
    ]};
    component.initiateForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form value', () => {
    expect(JSON.stringify(component.value)).toEqual('{"term":true,"country":"UK"}');
  });

  it('should add 1 subscriptions to subManager', () => {
    let spy = spyOn(component.subManager, 'add');
    component.initiateForm();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should add controls to formgroup', () => {
    expect(Object.keys(component.form.controls).length).toEqual(4);
  });

  it('should bind validators to be added to controls', () => {
    let control = component.form.controls['name'];
    expect(control.validator).toBeDefined();
  });

  it('should return monitoring zones from form', () => {
    component.config.zones.forEach(z => component.remoteZones.push(new FormControl(true)));
    expect(component.config.zones.length).toEqual(3);
  });

  it('should execute ngOnChanges and initiateForm()', () => {
    let spy = spyOn(component, 'initiateForm');
    component.ngOnChanges({
      config: new SimpleChange(null, [{type: "checkbox", label: "percpu", name: "percpu"},
      {type: "checkbox", label: "totalcpu", name: "totalcpu", value: true},
      {type: "checkbox", label: "collectCpuTime", name: "collectCpuTime"},
      {type: "checkbox", label: "reportActive", name: "reportActive"}], true)
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe once component is destroyed', () => {
    let spy = spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
