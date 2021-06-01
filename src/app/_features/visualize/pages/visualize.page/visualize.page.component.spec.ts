import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualizePage } from './visualize.page.component';
import { ActivatedRoute } from '@angular/router';
import { MetricsService } from 'src/app/_services/metrics/metrics.service';
import { SharedModule } from '../../../../_shared/shared.module';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import {
  IMetric
} from '../../../../_models/metrics';
import { default as metricss } from '../../../../_mocks/metrics/metrics.json';
import { of } from 'rxjs';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }, {
    queryParams: {
      metric:"cpu_idle",
      group:"cpu",

        duration: '12HR',
        start: '328833',
        end: '8829938'
      
    }
  }
];


const metrics: IMetric[] = metricss;
const metricDD=([].concat.apply([], metrics.filter(m => m.group==="network").map(a => a.metricName)) as any);
const groupDD=metrics.map(a =>a.group);

describe('VisualizePage', async() => {
  let injector: TestBed;
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
          queryParams: of(),
          root: {
            routeConfig : routes[0]
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
      injector = getTestBed();
    component = fixture.componentInstance;
    metricService = injector.inject(MetricsService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set query parameter', () => {
   
    component.setQueryParams(routes[1].queryParams);
    expect(component.visualize.date.start.toString()).toEqual(routes[1].queryParams.start);
    expect(component.visualize.date.end.toString()).toEqual(routes[1].queryParams.end);
    expect(component.visualize.date.duration.toString()).toEqual(routes[1].queryParams.duration);
    expect(component.visualize.groupQuery).toEqual([routes[1].queryParams.group]);
    expect(component.visualize.metricQuery.join(',')).toEqual(routes[1].queryParams.metric);
  });

  it("should set group in Query parameter", () =>{
    component.groupSelection(routes[1].queryParams.group);
    expect(component.groupPillSet.size).toEqual(1);
  })
  it("should set metric in Query parameter", () =>{
    component.metricSelection(routes[1].queryParams.metric);
    expect(component.metricPillSet.size).toEqual(1);
    component.route.queryParams.subscribe(par =>{
      expect(par["metric"]).toEqual(routes[1].queryParams.metric);
    });
  })
  it("should remove group pills", () =>{
    component.dismissGroup(routes[1].queryParams.group);
    expect(component.metricPillSet.size).toEqual(0);
    expect(component.groupPillSet.size).toEqual(0);
   
  });
  it("should remove metric pills", () =>{
    component.dismissMetric(routes[1].queryParams.metric);
    expect(component.metricPillSet.size).toEqual(0);
  })
  it("should selected the group from dropdown if group is avaialble in query parameters ", () =>{
    component.visualize.groupQuery=[groupDD[0]];
    expect(component.defaultgroup(groupDD[0])).toEqual(true);
  })
  it("should selected the metric in metric dropdown if metric is metricDD in query parameters ", () =>{
    component.visualize.metricQuery=[metricDD[0]];
    console.log(component.visualize.metricQuery);
    expect(component.defaultMetric(metricDD[0])).toEqual(true);
  })
  
});
