import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceListComponent } from './resource-list.component';
import { ResourcesService } from '../../../../_services/resources/resources.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock';
import { of } from 'rxjs';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { Monitor } from 'src/app/_models/monitors';
import { mockResourcesProvider } from 'src/app/_interceptors/request.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { envConfig, EnvironmentConfig } from 'src/app/_services/featureConfig/environmentConfig.service';

describe('ResourceListComponent', () => {
  let component: ResourceListComponent;
  let fixture: ComponentFixture<ResourceListComponent>;
  let env: EnvironmentConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ResourceListComponent, PaginationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        {provide:ResourcesService},
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        },
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
