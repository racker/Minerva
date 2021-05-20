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
  
  });
});
