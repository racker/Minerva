import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDropdownComponent } from './metric-dropdown.component';

describe('MetricGroupComponent', () => {
  let component: MetricDropdownComponent;
  let fixture: ComponentFixture<MetricDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add drown down create', () => {
    spyOn(component.emitedValue, 'emit')
    component.ddSelection('item');
    expect(component.pills.size).toEqual(1);
    expect(component.emitedValue.emit).toHaveBeenCalled();
  });
  it('should remove pills item and the same value', () => {
    spyOn(component.dismissPill, 'emit')
    component.pillDismiss('item');
    expect(component.pills.size).toEqual(0);
    expect(component.dismissPill.emit).toHaveBeenCalled();
  });
  it('should return true if default selection is same as function parameter ', () => {
    component.defaultSelection='test';
    component.defaultgroup('test');
    expect( component.defaultgroup('test')).toEqual(true);
  });
  
  
  
});
