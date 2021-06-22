import { default as metrics } from './metrics.json';
import { default as groups } from './groups.json';
import { default as names } from './names.json';
import { default as tags } from './tags.json';

import {
    QueryMetricResponse
} from '../../_models/metrics';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export class metricMocks {
    metrics: QueryMetricResponse[] = metrics;
    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        switch (true) {
            case url.includes('metricNames'):
                return new HttpResponse({ status: 200, body: (names) });
            case url.includes('metricGroup'):
                return new HttpResponse({ status: 200, body: (groups) });
            case url.includes('tags'):
                return new HttpResponse({ status: 200, body: (tags) });
            case url.includes('query'):
                    return new HttpResponse({ status: 200, body: (metrics) });
        }
    }
}
