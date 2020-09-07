import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal type', () => {
      component.modalType = 'modal type';
      fixture.detectChanges();
      expect(component.modalType).toBe('modal type');
     
  });

  it('should show message', () => {
    component.message = "Are you sure you'd like to delete this Resource?";
    fixture.detectChanges();
    var hxDivValue =  fixture.debugElement.query(By.css('hx-div')).nativeElement.textContent;
    expect(hxDivValue).toContain("Are you sure you'd like to delete this Resource?");
  });

  it('should show id', () => {
    component.header = "delete devUbuntu";
    fixture.detectChanges();
    expect(component.header).toBe('delete devUbuntu');
  });

  it('should listen for close', () => {
    spyOn(component.triggerClose, 'emit');
    fixture.detectChanges();
    component.close('close');
    expect(component.triggerClose.emit).toHaveBeenCalled();  
  });

  it('should listen for confirm', () => {
    spyOn(component.triggerConfirm, 'emit');
    fixture.detectChanges();
    component.confirm();
    expect(component.triggerConfirm.emit).toHaveBeenCalled();  
  });
});
