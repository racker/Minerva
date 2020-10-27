import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ResourcesService } from '../_services/resources/resources.service';
import { resourcesMock } from '../_mocks/resources/resources.service.mock';
import { monitorsMock } from '../_mocks/monitors/monitors.service.mock';
import { MonitorService } from '../_services/monitors/monitor.service';
import { EnvironmentConfig } from "../_services/featureConfig/environmentConfig.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    page:number = 0;
    size:number = 0;
    resourceService :any;
    monitorService:any;
    env: EnvironmentConfig;
    mockedResources = new resourcesMock();
    mockMon= new monitorsMock();;
    constructor(private inj: Injector) {
        this.resourceService = this.inj.get(ResourcesService);
        this.monitorService = this.inj.get(MonitorService);
        this.env= this.inj.get(EnvironmentConfig);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.env.mock) {
            return next.handle(request);
        }

        const { url, method } = request;

        this.page = +request.params.get('page');
        this.size = +request.params.get('size');

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(this.handleRoute(url, method, request, next)))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        switch (true) {

            case url.includes('/resources'):
                return () => {
                    return of(this.mockedResources.handleRoute(url, method, request, next) as any)
                }
            case url.includes('/monitor'):
                return () => {
                    return of(this.mockMon.handleRoute(url, method, request, next) as any);
                }
            default:
                // pass through any requests not handled above
                return () => { return next.handle(request); }
        }
    }
}


export const mockResourcesProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
};
