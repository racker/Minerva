import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricsService } from './metrics.service';
import { metricMocks } from '../../_mocks/metrics/metrics.service.mock';
import { InfluxService } from '../influx/influx.service';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';

describe('MetricsService', () => {
  let injector: TestBed;
  let service: MetricsService;
  let influxService: InfluxService;
  let metricsMocks: metricMocks = new metricMocks();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MetricsService, InfluxService,
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
    influxService = injector.inject(InfluxService);

  });

  it('should be created', () => {
    const service: MetricsService = TestBed.get(MetricsService);
    expect(service).toBeTruthy();
  });

  describe('Setup defaults', () => {
    it('should have sensor systems', () => {
      expect(Array.isArray(service.sensorSystems)).toBe(true);
    });

    it('should have metricFields$ asObservable', (done) => {
      const service: MetricsService = TestBed.get(MetricsService);
      service.metricFields$().subscribe((fields) => {
        expect(fields).toBe(null);
        done();
      });
    });

    it('should have metricMeasurements$ asObservable', (done) => {
      service.metricMeasurements$().subscribe((measurements) => {
        expect(measurements).toBe(null);
        done();
      });
    });

    it('should have metricDevices$ asObservable', (done) => {;
      service.metricDevices$().subscribe((fields) => {
        expect(fields).toBe(null);
        done();
      });
    });

    it('should have metrics$ asObservable', (done) => {
      service.metrics$().subscribe((fields) => {
        expect(fields).toBe(null);
        done();
      });
    });
  });

  describe('- Requests', () => {
    it('should getMeasurements()', () => {
      service.getMeasurements(true).subscribe((measurements) => {
        expect(measurements).toEqual(metricsMocks.measurements);
      });
    });

    it('should call query params from influxShowMeasurements()', () => {
      let spy = spyOn(influxService, 'influxShowMeasurements');
      service.getMeasurements(true).subscribe();
      expect(spy).toHaveBeenCalled();
    })


    it('should getMetricFields()', () => {
      service.getMetricFields('MAAS_http').subscribe((fields) => {
        expect(fields).toEqual(metricsMocks.fields);
      });
    });

    it('should call query params from influxShowFields()', () => {
      let spy = spyOn(influxService, 'influxShowFields')
      service.getMetricFields('MAAS_http');
      expect(spy).toHaveBeenCalled();
    });

    it('should getDevices()', () => {
      service.getDevices('http', 'MAAS_http', '6h', 'now()')
      .subscribe((devices) => {
        expect(devices).toEqual(metricsMocks.devices);
      });
    });

    it('should call query params from influxDevices()', () => {
      let spy = spyOn(influxService, 'influxDevices')
      service.getDevices('http', 'MAAS_http', '6h', 'now()')
      expect(spy).toHaveBeenCalled();
    });

    it('should getMetrics()', () => {
      service.getMetrics('http', 'MAAS_http', '6h', 'now()', '588372')
      .subscribe((metrics) => {
        expect(metrics).toEqual(metricsMocks.metrics);
      });
    });

    it('should call query params from influxMetrics()', () => {
      let spy = spyOn(influxService, 'influxMetrics');
      service.getMetrics('http', 'MAAS_http', '6h', 'now()', '588372');
      expect(spy).toHaveBeenCalled();
    });


    it('should return unique systems', () => {
      let systems: string[] = [];
      metricsMocks.measurements.forEach(el => {
        let system = el.name.substring(0, el.name.indexOf("_"));
        const index = systems.findIndex((item) => item === system);
        if (index === -1) {
          systems.push(system);
        }
      });

      service.getMeasurements(false).subscribe((measurement) => {
        expect(service.sensorSystems).toEqual(systems);
      });

    });
  });
});
