import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResourcesService } from '../_services/resources/resources.service';
import { resourcesMock } from '../_mocks/resources/resources.service.mock';
import { monitorsMock } from '../_mocks/monitors/monitors.service.mock';
import { MonitorService } from '../_services/monitors/monitor.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    page:number = 0;
    size:number = 0;
    resourceService :any;
    monitorService:any;
    mockedResources = new resourcesMock();
    mockMon= new monitorsMock();;
    constructor(private inj: Injector) { 
        this.resourceService = this.inj.get(ResourcesService);
        this.monitorService = this.inj.get(MonitorService)
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!environment.mock) {
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
            case url.includes('/resources') && method === 'GET' && this.size > 0:
                return () => {
                    let mocks = Object.assign({}, this.mockedResources.collection);
                    let slicedData = [...mocks.content.slice(this.page * this.size, (this.page + 1) * this.size)];
                    this.resourceService.resources = mocks;
                    this.resourceService.resources.content = slicedData;
                    return of(new HttpResponse({ status: 200, body: (this.resourceService.resources as any) }));
                };
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'GET':
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'PUT':
                return () => {
                    this.resourceService.resource = this.mockedResources.single;
                    return of(new HttpResponse({ status: 200, body: (this.resourceService.resource as any) }));
                }
            case url.endsWith('/resources') && method === 'POST':
                return () => {
                    this.resourceService.resource = this.mockedResources.single;
                    return of(new HttpResponse({ status: 201, body: (this.resourceService.resource as any) }));
                };
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'HEAD':
                return () => {
                    return throwError(new HttpErrorResponse({
                        error: 'Not Found',
                        status: 404
                    }));
                };
            case url.includes('/resources-search') && method === 'GET':
                return () => {
                    let mocks = Object.assign({}, this.mockedResources.collection);
                    let slicedData = [...mocks.content.slice(0 * 10, 1 * 10)];
                    this.resourceService.resources = mocks;
                    this.resourceService.resources.content = slicedData;
                    return of(new HttpResponse({ status: 200, body: (this.resourceService.resources as any) }));
                };
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'DELETE':
                return () => {
                    return of(new HttpResponse({ status: 204, body: true }));
                };
            case url.includes('/monitor') :
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
