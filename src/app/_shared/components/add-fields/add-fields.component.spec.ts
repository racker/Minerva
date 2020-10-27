import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddFieldsComponent } from './add-fields.component';
import { Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { envConfig, EnvironmentConfig } from 'src/app/_services/featureConfig/environmentConfig.service';

describe('AddFieldsComponent', () => {
  let component: AddFieldsComponent;
  let fixture: ComponentFixture<AddFieldsComponent>;
  let env: EnvironmentConfig;
  let submitSubject: Subject<void> = new Subject<void>();
  let injector:TestBed;

  const onChange = () => {
    component.ngOnChanges({
      initialData: new SimpleChange(null, component.initialData, true)
    });
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ AddFieldsComponent ],
      providers: [{
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldsComponent);
    component = fixture.componentInstance;
    component.initialData = { ping_ip: '127.0.0.1', mount: '/'};
    component.validateForm = submitSubject.asObservable();
    onChange();
    fixture.detectChanges();
    injector= getTestBed();
    env = injector.inject(EnvironmentConfig);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setup defaults', () => {
    expect(component.formValuesChanged).toBeDefined();
    expect(component.formValid).toBeDefined();
    expect(component.keyValueForm).toBeDefined();
    expect(component.subManager).toBeDefined();
  });

  it('should return length of initial form array', () => {
    component.ngOnInit();
    expect(component.metaPairs.length).toEqual(3);
  });

  it('should emit formvaluesChanged', () => {
    spyOn(component.formValuesChanged, 'emit');
    component.ngOnInit();
    component.getGroupControl(1, 'key').patchValue('forever');
    expect(component.formValuesChanged.emit).toHaveBeenCalled();
  });

  it('should emit form submitted and valid', () => {
    spyOn(component.formValid, 'emit');
    component.ngOnInit();
    submitSubject.next();
    expect(component.formValid.emit).toHaveBeenCalledWith(true);
  });

  it('should emit form submitted and invalid', () => {
    spyOn(component.formValid, 'emit');
    component.ngOnInit();
    component.getGroupControl(1, 'key').patchValue('');
    submitSubject.next();
    expect(component.formValid.emit).toHaveBeenCalledWith(false);

  });

  it('should add a row to form', () => {
    component.addRow();
    expect(component.metaPairs.length).toEqual(4);
  });

  it('should remove a row from form', () => {
    component.removeRow(0);
    expect(component.metaPairs.length).toEqual(2);
  });

  it('should update form on changes', () => {
    component.ngOnInit();
    expect(component.metaPairs.length).toEqual(3);
  });

  it('should create a row for form', () => {
    component.metaPairs.push(component.createItem());
    expect(component.metaPairs.length).toEqual(4);
  });

  it('should return control from index and fieldname', () => {
    component.ngOnInit();
    expect(component.getGroupControl(1, 'key').value).toEqual('mount');
  });

  it('should return total items', () => {
    component.ngOnInit();
    expect(component.totalItems()).toEqual(3);
  });

  it('should unsubscribe once component is destroyed', () => {
    spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subManager.unsubscribe).toHaveBeenCalled();
  });
});
