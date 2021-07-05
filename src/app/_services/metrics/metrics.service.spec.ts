import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricsService } from './metrics.service';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';
import { default as names } from '@minerva/_mocks/metrics/names.json'
import { default as groups } from '@minerva/_mocks/metrics/groups.json'
import { default as tags } from '@minerva/_mocks/metrics/tags.json'
import { default as metrics } from '@minerva/_mocks/metrics/metrics.json'

describe('MetricsService', () => {
  let injector: TestBed;
  let service: MetricsService;
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

  it('should have getter & setters', () => {
    service.selectedGroup = {group: 'yea'};
    service.selectedTags = {tag: 'sure'};
    service.selectedName = {name: 'right'};
    expect(service.selectedGroup.hasOwnProperty('group')).toEqual(true);
    expect(service.selectedTags.hasOwnProperty('tag')).toEqual(true);
    expect(service.selectedName.hasOwnProperty('name')).toEqual(true);
  })

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
    service.start = 'xiisusiis';
    expect(service['queryParams']()).toEqual({
      start: 'xiisusiis-ago'
    });
  });

  it('should compose query params with end date', () => {
    service.end = '2021-05-05T00:42:10.000Z';
    expect(service['queryParams']().hasOwnProperty('end'))
    .toEqual(true);
  });

  it('should return list of metrics names getMetricList()', () => {
    service.getMetricList('stuff').subscribe((data) => {
      expect(data).toEqual(names);
    });
  });

  it('should return list of metrics tags getTagsList()', () => {
    service.getTagsList({stuff: 'yea'}).subscribe((data) => {
      expect(data.toString()).toEqual(tags.toString());
    });
  });

  it('should return list of metrics groups getMetricGroupList()', () => {
    service.getMetricGroupList().subscribe((data) => {
      expect(data).toEqual(groups);
    })
  });

  it('should return metrics datapoints getMetricsDataPoints()', () => {
    service.getMetricsDataPoints().subscribe((data) => {
      expect(data).toEqual(metrics);
    });
  });
});
