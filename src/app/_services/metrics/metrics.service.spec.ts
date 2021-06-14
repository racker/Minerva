import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricsService } from './metrics.service';
import { metricMocks } from '../../_mocks/metrics/metrics.service.mock';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';
import { HttpHeaders } from '@angular/common/http';

describe('MetricsService', () => {
  let injector: TestBed;
  let service: MetricsService;
  let metricsMocks: metricMocks = new metricMocks();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MetricsService,
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
      }
      ]
    });

    injector = getTestBed();
    service = injector.inject(MetricsService);

  });

  it('should be created', () => {
    const service: MetricsService = TestBed.inject(MetricsService);
    expect(service).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(service['metricGroup']).toBeDefined();
  });

  it('should return metricGroup.asObservable', (done) => {
    service.GetmtrcGrp$().subscribe((groups) => {
      expect(groups).toBe(null);
      done();
    });
  });

  it('should return metricNames.asObservable', (done) => {
    service.GetMtrcNms$().subscribe((name) => {
      expect(name).toBe(null);
      done();
    });
  });

  it('should return metrics.asObservable', (done) => {
    service.getMetrics$().subscribe((metrics) => {
      expect(metrics).toBe(null);
      done();
    });
  });

  it('should return header object', () => {
    let header = service['xTenantHeader']();
    expect(header.headers.get('Content-Type').toString()).toEqual('application/json');
    expect(header.headers.get('X-Tenant')).toEqual('833544');
  });

  it('should compose query params for requests', () => {
    /*
    expect(service['queryParams']()).toBe({
      start: '',
      end: '',

      });
    */
  });

  it('should return list of metrics names getMetricList()', () => {

  });

  it('should return list of metrics tags getTagsList()', () => {

  });

  it('should return list of metrics groups getMetricGroupList()', () => {

  });

  it('should return metrics datapoints getMetricsDataPoints()', () => {

  });


});
