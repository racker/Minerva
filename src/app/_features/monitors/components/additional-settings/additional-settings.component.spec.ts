import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AdditionalSettingsComponent } from './additional-settings.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { Subscription } from 'rxjs';
import { ResourcesService } from 'src/app/_services/resources/resources.service';

describe('AdditionalSettingsComponent', () => {
  let injector: TestBed;
  let component: AdditionalSettingsComponent;
  let fixture: ComponentFixture<AdditionalSettingsComponent>;
  let resourceService: ResourcesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ AdditionalSettingsComponent ],
      imports: [ SharedModule ],
      providers: [
        DurationSecondsPipe,
        ResourcesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(AdditionalSettingsComponent);
    component = fixture.componentInstance;
    component.initialData = new monitorsMock().single;
    resourceService = injector.get(ResourcesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the defaults', () => {
    expect(component.subManager).toEqual(new Subscription());
    expect(component.updateSettingForm).toBeDefined();
  });

  it('should set the form values', () => {
    expect(component.updateSettingForm.value.interval).toEqual(66);
    expect(component.updateSettingForm.value.excludedResourceIds).toEqual([
      { resource: 'development:5' },
      { resource: 'development:6' },
      { resource: 'development:7' },
    ]);
    expect(component.updateSettingForm.value.labelSelectorMethod).toEqual('AND');
    expect(component.updateSettingForm.value.resourceId).toEqual('development:2');
  })

  it('should return resourceDropdowns formarray', () => {
    expect(component.resourceDropdowns.length).toEqual(3);
  });

  it('should add dropdown to resourceDropdowns', () => {
    component.addExcludedResource();
    expect(component.resourceDropdowns.length).toEqual(4);
  });

  it('should remove dropdown from resourceDropdowns', () => {
    component.deleteExcludedResource(0);
    expect(component.resourceDropdowns.length).toEqual(2);
  });

  it('should return totalItems', () => {
    expect(component.totalItems()).toEqual(3);
  });

});
