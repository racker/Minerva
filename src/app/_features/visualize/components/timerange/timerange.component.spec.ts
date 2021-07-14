import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimeRangeComponent } from './timerange.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { envConfig, EnvironmentConfig } from '@minerva/_services/config/environmentConfig.service';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }
];

describe('TimerangeComponent', () => {
  let component: TimeRangeComponent;
  let router: Router;
  let fixture: ComponentFixture<TimeRangeComponent>;
  let metricService: MetricsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TimeRangeComponent ],
      providers: [
        MetricsService,
        {
        provide: ActivatedRoute,
        useValue: {
          root: {
            routeConfig : routes[0]
          }
        },
      },
      {
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
      }
    ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    metricService = TestBed.inject(MetricsService);
    component.start = new Date('2021-05-05T00:42:10.000Z');
    component.end = new Date('2021-05-21T00:42:15.000Z');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set date.start to input', () => {
    expect(component.date.start).toEqual(component.start);
  });
  it('should set date.end to input', () => {
    expect(component.date.end).toEqual(component.end);
  });

  it('should set date.presets to false', () => {
    expect(component.date.presets).toEqual(false);
  });

  it('should update duration onDurationChange()', () => {
    let spy=spyOn(component.timeRangeEmitter, 'emit')
    component.onDurationChange({value: 'stuffyea'});
    expect(component.date.start).toBe(null);
    expect(component.date.end).toBe(null);
    expect(spy).toHaveBeenCalled();

  });

  it('should update query params on updateNavigation()', () => {
    let spy=spyOn(component.timeRangeEmitter, 'emit')
    component.onDurationChange({value: 'stuffyea'})
    expect(spy).toHaveBeenCalled();
  });

  it('should update time range timeRangeUpdate', () => {
    let spy=spyOn(component.timeRangeEmitter, 'emit')
    component.date.start = new Date('2021-06-06T00:42:10.000Z');
    component.date.end = new Date('2021-07-07T00:42:10.000Z');
    component.timeRangeUpdate();
    expect(spy).toHaveBeenCalled();
  });


});
