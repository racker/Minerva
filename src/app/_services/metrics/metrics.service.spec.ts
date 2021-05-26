import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MetricsService } from './metrics.service';
import { metricMocks } from '../../_mocks/metrics/metrics.service.mock';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';

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

  describe('Setup defaults', () => {

  });
});
