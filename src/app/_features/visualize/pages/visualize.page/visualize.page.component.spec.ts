import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualizePage } from './visualize.page.component';
import { ActivatedRoute } from '@angular/router';
import { MetricsService } from 'src/app/_services/metrics/metrics.service';
import { SharedModule } from '../../../../_shared/shared.module';
import { By } from '@angular/platform-browser';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }, {
    queryParams: {
      system: 'ZENOSS',
      measurement: 'cpu_check',
      device: '466255362',
      start: '328833',
      end: '8829938'
    }
  }
];

describe('VisualizePage', async() => {
  let component: VisualizePage;
  let fixture: ComponentFixture<VisualizePage>;
  let metricService: MetricsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        VisualizePage
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            ...routes[1]
          },
          root: {
            routeConfig: routes[0]
          }
        }
      },
      {
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
    }],
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
      fixture = TestBed.createComponent(VisualizePage);
    component = fixture.componentInstance;
    metricService = TestBed.get(MetricsService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true', () => {
    expect(component.loading).toEqual(true);
  });

  it('should set system', () => {
    expect(fixture.debugElement.query(By.css('app-visualize-selections'))
      .componentInstance.system).toBe(routes[1].queryParams.system);
  });

  it('should set measurement', () => {
    expect(fixture.debugElement.query(By.css('app-visualize-selections'))
      .componentInstance.measurement).toBe(routes[1].queryParams.measurement);
  });

  it('should set device', () => {
    expect(fixture.debugElement.query(By.css('app-visualize-selections'))
      .componentInstance.device).toBe(routes[1].queryParams.device);
  });

  it('should set start', () => {
    expect(fixture.debugElement.query(By.css('app-visualize-selections'))
      .componentInstance.start).toBe(routes[1].queryParams.start);
  });

  it('should set end date', () => {
    expect(fixture.debugElement.query(By.css('app-visualize-selections'))
      .componentInstance.end).toBe(routes[1].queryParams.end);
  });

  it('should be present', () => {
    expect(fixture.debugElement.query(By.css('app-graphs'))
    .componentInstance).not.toBe(null);
  });

  it('should add all subscriptions', async() => {
    let spy = spyOn(component.subManager, 'add');
    fixture.ngZone.run(() => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });

  it('should destroy subscriptions', () => {
    spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subManager.unsubscribe).toHaveBeenCalled();
  });

});
