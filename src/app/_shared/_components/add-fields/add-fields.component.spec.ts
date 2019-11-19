import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddFieldsComponent } from './add-fields.component';
import { Subject } from 'rxjs';

describe('AddFieldsComponent', () => {
  let component: AddFieldsComponent;
  let fixture: ComponentFixture<AddFieldsComponent>;
  let submitSubject: Subject<void> = new Subject<void>()

  const onChange = () => {
    component.ngOnChanges({
      initialData: new SimpleChange(null, component.initialData, true)
    });
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule ],
      declarations: [ AddFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldsComponent);
    component = fixture.componentInstance;
    component.initialData = { ping_ip: '127.0.0.1', mount: '/'};
    component.validateForm = submitSubject.asObservable();
    fixture.detectChanges();
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
    expect(component.metaPairs.length).toEqual(1);
  });

  it('should emit formvaluesChanged', () => {
    spyOn(component.formValuesChanged, 'emit');
    onChange();
    component.ngOnInit();
    component.getGroupControl(1, 'key').patchValue('forever');
    expect(component.formValuesChanged.emit).toHaveBeenCalled();
  });

  it('should emit form submitted and valid', () => {
    spyOn(component.formValid, 'emit');
    onChange();
    component.ngOnInit();
    submitSubject.next();
    expect(component.formValid.emit).toHaveBeenCalledWith(true);
  });

  it('should emit form submitted and invalid', () => {
    spyOn(component.formValid, 'emit');
    onChange();
    component.ngOnInit();
    component.getGroupControl(1, 'key').patchValue('');
    submitSubject.next();
    expect(component.formValid.emit).toHaveBeenCalledWith(false);

  });

  it('should add a row to form', () => {
    component.addRow();
    expect(component.metaPairs.length).toEqual(2);
  });

  it('should remove a row from form', () => {
    component.addRow();
    component.removeRow(0);
    expect(component.metaPairs.length).toEqual(1);
  });

  it('should update form on changes', () => {
    onChange();
    component.ngOnInit();
    expect(component.metaPairs.length).toEqual(3);
  });

  it('should create a row for form', () => {
    component.metaPairs.push(component.createItem());
    expect(component.metaPairs.length).toEqual(2);
  });

  it('should return control from index and fieldname', () => {
    onChange();
    component.ngOnInit();
    expect(component.getGroupControl(1, 'key').value).toEqual('mount');
  });

  it('should return total items', () => {
    onChange();
    component.ngOnInit();
    expect(component.totalItems()).toEqual(3);
  });

  it('should unsubscribe once component is destroyed', () => {
    spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subManager.unsubscribe).toHaveBeenCalled();
  });
});
