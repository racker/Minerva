import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MonitorService } from "../../../../_services/monitors/monitor.service";
import { MonitorListComponent } from './monitor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { monitorsMock } from "../../../../_mocks/monitors/monitors.service.mock";
import { of } from 'rxjs';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { mockResourcesProvider } from 'src/app/_interceptors/request.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

describe('MonitorListComponent', () => {
  let component: MonitorListComponent;
  let fixture: ComponentFixture<MonitorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MonitorListComponent, PaginationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
              ],
      providers:[
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        },
        {provide:MonitorService,

      },
      mockResourcesProvider]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get bound monitors', (done) =>{
    let spy = spyOn(component, 'getMonitors').and.returnValue(of(new monitorsMock().boundMonitor));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(component.getMonitors).toHaveBeenCalled()
      expect(component.monitors.length).toBeGreaterThanOrEqual(1);
      done();
          })
  })
});
