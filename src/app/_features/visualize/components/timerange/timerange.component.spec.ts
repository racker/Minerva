import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimeRangeComponent } from './timerange.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { isValidDate } from '@minerva/_shared/utils';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
      }],
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

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should set date.start to input', () => {
    expect(component.date.start).toEqual(component.start);
  });
  xit('should set date.end to input', () => {
    expect(component.date.end).toEqual(component.end);
  });

  xit('should import and assign isValidDate()', () => {
    expect(component.isValidDate).toEqual(isValidDate);
  });

  xit('should set metric service start & end date', () => {

  })

  xit('should set MetricService start & end date on ngOnInit()', () => {
    expect(metricService.start).toBe('2021-05-05T00:42:10.000Z');
    expect(metricService.end).toBe('2021-05-21T00:42:15.000Z');
  });

  xit('should set date.presets to false', () => {
    expect(component.date.presets).toEqual(false);
  });

  xit('should update duration onDurationChange()', () => {
    let spy = spyOn(component, 'updateNavigation');
    component.onDurationChange({value: 'stuffyea'});
    expect(spy).toHaveBeenCalled();
  });

  xit('should update query params on updateNavigation()', () => {
    let spy = spyOn(router, 'navigate');
    component.onDurationChange({value: 'stuffyea'})
    expect(spy).toHaveBeenCalled();
  });

  xit('should update time range timeRangeUpdate', () => {
    let spyUpdate = spyOn(component, 'updateNavigation');
    let spyNav = spyOn(router, 'navigate');
    component.date.start = new Date('2021-06-06T00:42:10.000Z');
    component.date.end = new Date('2021-07-07T00:42:10.000Z');
    component.timeRangeUpdate();
    expect(spyUpdate).toHaveBeenCalled();
    expect(spyNav).toHaveBeenCalled();
  });


});
