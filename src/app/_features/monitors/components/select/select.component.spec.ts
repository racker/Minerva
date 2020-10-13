import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SelectComponent } from './select.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const fieldConfig: FieldConfig = {
    name: 'disk',
    type: 'select',
    options: ['stuff', 'whatever', 'yes']
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ SelectComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.config = fieldConfig;
    component.group = formBuilder.group({
      [component.config.name]: '',
      placeholder: '',
      inputType: ''
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SelectComponent);
  //   component = fixture.componentInstance;
  //   component.config = fieldConfig;
  //   component.group = formBuilder.group({
  //     [component.config.name]: '',
  //     placeholder: '',
  //     inputType: ''
  //   });
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should embed root of template', () => {
    let spy = spyOn(component['root'], 'createEmbeddedView');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
