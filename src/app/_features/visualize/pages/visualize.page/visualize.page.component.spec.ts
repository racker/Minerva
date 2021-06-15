import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualizePage } from './visualize.page.component';
import { ActivatedRoute } from '@angular/router';
import { MetricsService } from 'src/app/_services/metrics/metrics.service';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

import { of } from 'rxjs';
import { SharedModule } from '@minerva/_shared/shared.module';

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
      tags:"CORE",

        duration: '12HR',
        start: '328833',
        end: '8829938'

    }
  }
];


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
    expect(component.visualize.group).toEqual([routes[1].queryParams.group]);
    expect(component.visualize.metrics.join(',')).toEqual(routes[1].queryParams.metric);
  });

  it('shoud set metricServic selected group', () => {

  });


  it('shoud set metricServic selected metric', () => {

  });

  it('shoud set metricServic selected tags', () => {

  });

  it('should make getMetricsDataPoints() requests when metric & tags \
  query param present', () => {

  });

  it("should remove group pills", () =>{
    component.disMissedGroup(routes[1].queryParams.group);
    expect(component.metricPillSet.size).toEqual(0);
    expect(component.groupPillSet.size).toEqual(0);
  });

  it("should remove metric pills", () =>{
    component.disMissedMetric(routes[1].queryParams.metric);
    expect(component.metricPillSet.size).toEqual(0);
  });

  it("should remove tags pills", () =>{
    component.disMissedTag(routes[1].queryParams.tags);
    expect(component.tagPillSet.size).toEqual(0);
  });

  it("should change metrics", () =>{
    let spy = spyOn(component, 'getListOfTags');
    component.metricChange(routes[1].queryParams.metric);
    expect(spy).toHaveBeenCalled();
  });

  it("should change tags", () =>{
    let spy = spyOn(component, 'addTagsInQuery');
    component.tagChange(routes[1].queryParams.tags);
    expect(spy).toHaveBeenCalled();
  });

  it("should change group", () =>{
    let spy = spyOn(component, 'addGroupinQuery');
    component.metricGroupChange(routes[1].queryParams.metric);
    expect(spy).toHaveBeenCalled();
  });

  it("should call changingQueryParams while change in tags", () =>{
    component.tagPillSet.add('cpu_idle');
    let spy= spyOn(component,"changingQueryParams");
    component.addTagsInQuery();
    expect(spy).toHaveBeenCalled();
  });

  it("should changingQueryParams after group change", () =>{
    component.groupPillSet.add('cpu_idle');
    let spy= spyOn(component,"changingQueryParams");
    component.addGroupinQuery();
    expect(spy).toHaveBeenCalled();
  });

  it("should reset all pill sets and reset default dropdowns", () => {

  })

  it("should only call getMetricsDataPoints() if \
  no group param & tags + metric is selected", () => {

  });

});
