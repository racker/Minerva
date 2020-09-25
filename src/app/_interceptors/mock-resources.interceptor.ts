import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResourcesService } from '../_services/resources/resources.service';
import { resourcesMock } from '../_mocks/resources/resources.service.mock';


@Injectable()
export class MockResourcesInterceptor implements HttpInterceptor {
    constructor(private inj: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (!environment.mock) {
            return next.handle(request);
        }

        const mockedResources = new resourcesMock();
        const { url, method, headers, body } = request;

        const page = +request.params.get('page');
        const size = +request.params.get('size');

        const resourceService = this.inj.get(ResourcesService);
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.includes('/resources') && method === 'GET' && size > 0:
                    return getAllResource();
                case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'GET':
                    return getAResource();
                case url.endsWith('/resources') && method === 'POST':
                    return createResource();
                case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'PUT':
                    return getAResource();
                case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'HEAD':
                    return validateResource();
                case url.includes('/resources-search') && method === 'GET':
                    return searchResources();
                case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'DELETE':
                    return of(new HttpResponse({ status: 204, body: true }));
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function getAllResource() {
            let mocks = Object.assign({}, mockedResources.collection);
            let slicedData = [...mocks.content.slice(page * size, (page + 1) * size)];
            resourceService.resources = mocks;
            resourceService.resources.content = slicedData;
            return of(new HttpResponse({status: 200, body: (resourceService.resources as any)}));
        }

        function getAResource() {
            resourceService.resource = mockedResources.single;
            return of(new HttpResponse({status: 200, body: (resourceService.resource as any)}));
        }

        function createResource() {
            resourceService.resource = mockedResources.single;
            return of(new HttpResponse({status: 201, body: (resourceService.resource as any)}));
        }

        function validateResource() {
            return throwError(new HttpErrorResponse({
                error: 'Not Found',
                status: 404
            }));
        }

        function searchResources() {
            let mocks = Object.assign({}, mockedResources.collection);
            let slicedData = [...mocks.content.slice(0 * 10, 1 * 10)];
            resourceService.resources = mocks;
            resourceService.resources.content = slicedData;
            return of(new HttpResponse({ status: 200, body: (resourceService.resources as any) }));
        }
    }
}

export const mockResourcesProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockResourcesInterceptor,
    multi: true
};