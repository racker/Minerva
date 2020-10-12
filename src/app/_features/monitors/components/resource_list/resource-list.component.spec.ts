import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceListComponent } from './resource-list.component';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock';
import { of } from 'rxjs';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { Monitor } from 'src/app/_models/monitors';
import { mockResourcesProvider } from 'src/app/_interceptors/mock-resources.interceptor';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ResourceListComponent, PaginationComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers:[
        {provide:ResourcesService},
        mockResourcesProvider
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(ResourceListComponent);
    component = fixture.componentInstance;
    const newMonitor: Monitor = new monitorsMock().single;
    component.monitor = newMonitor;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get bound resources', (done) =>{
    let spy = spyOn(component, 'getResources').and.returnValue(of(new resourcesMock().boundResource));
    component.ngOnInit();
    fixture.whenStable().then(() =>{
      expect(component.getResources).toHaveBeenCalled()
      expect(component.resources.length).toBeGreaterThanOrEqual(1);
      done();
    })
  });
});
