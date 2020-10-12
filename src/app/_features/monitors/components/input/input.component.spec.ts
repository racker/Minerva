import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field.interface';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const fieldConfig: FieldConfig = {
    name: 'cpu',
    type: 'text',
    validations: [{
      name: 'Yes',
      validator: 'Required',
      message: 'Required'
    }]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ InputComponent ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.config = fieldConfig;
    component.group = formBuilder.group({
      cpu: '',
      placeholder: '',
      inputType: ''
    });
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should embed root of template', () => {
    let spy = spyOn(component['root'], 'createEmbeddedView');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  })
});
