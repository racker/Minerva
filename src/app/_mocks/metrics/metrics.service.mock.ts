import { default as metricsDevices } from './devices.json';
import { default as metricsFields } from './fields.json';
import { default as metrics } from './metrics.json';
import { default as metricMeasurements } from './measurements.json';

import {
    IMetric
} from '../../_models/metrics';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export class metricMocks {
   
    metrics: IMetric[] = metrics;
   

    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        switch (true) {
            case url.includes('metricNames'):
                return new HttpResponse({ status: 200, body: ([].concat.apply([], metrics.map(a => a.metricName)) as any) });
            case url.includes('metricGroup'):
                return new HttpResponse({ status: 200, body: (metrics.map(a =>a.group) as any) });
          default:
            return new HttpResponse({ status: 200, body: ({msg: "Metric api"} as any) });
              // need to call from the json
         
        } 
        }
}
