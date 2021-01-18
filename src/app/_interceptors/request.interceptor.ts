import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ResourcesService } from '../_services/resources/resources.service';
import { resourcesMock } from '../_mocks/resources/resources.service.mock';
import { monitorsMock } from '../_mocks/monitors/monitors.service.mock';
import { MonitorService } from '../_services/monitors/monitor.service';
import { EnvironmentConfig } from "../_services/config/environmentConfig.service";
import { MinervaApiMock } from "../_mocks/minervaApi/minerva-api-service.mock"
import { MinervaApiService } from '../_services/minervaApi/minerva-api.service';
import { TenantMock } from 'projects/admin/src/app/_mocks/tenants/tenants.service.mock';
import { TenantmetaDataService } from 'projects/admin/src/app/_service/tenant-meta-data.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    page: number = 0;
    size: number = 0;
    resourceService: any;
    monitorService: any;
    minervaService: any;
    env: EnvironmentConfig;
    mockedResources = new resourcesMock();
    mockMon = new monitorsMock();
    mockMinerva = new MinervaApiMock();
    mockTenants = new TenantMock();

    constructor(private inj: Injector) {
        this.resourceService = this.inj.get(ResourcesService);
        this.monitorService = this.inj.get(MonitorService);
        this.env = this.inj.get(EnvironmentConfig);
        this.minervaService = this.inj.get(MinervaApiService);
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
                    console.log("Reached at 58");
                    return of(this.mockedResources.handleRoute(url, method, request, next) as any);
                }
            case url.includes('/monitors') || url.includes('-monitor'):
                return () => {
                    return of(this.mockMon.handleRoute(url, method, request, next) as any);
                }
            case url.includes('/intelligence'): // minerva-api
                return () => {
                    return of(this.mockMinerva.handleRoute(url, method, request, next) as any);
                }
            case url.includes('/tenant-metadata'):
                return () => {
                    return of (this.mockTenants.handleRoute(url, method, request, next) as any);
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
