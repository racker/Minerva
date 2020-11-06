import { default as resourceMockCollection } from './collection.json';
import { default as resourceMockSingle } from './single.json';
import { default as testResourceMock } from './testResource.json';
import { Resource, Resources } from 'src/app/_models/resources.js';
import { default as boundResource } from './boundResource.json';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

let resource: Resource = <Resource>{
    tenantId: resourceMockSingle.tenantId,
    resourceId: resourceMockSingle.resourceId,
    presenceMonitoringEnabled: resourceMockSingle.presenceMonitoringEnabled,
    associatedWithEnvoy: resourceMockSingle.associatedWithEnvoy,
    createdTimestamp: new Date(resourceMockSingle.createdTimestamp),
    updatedTimestamp: new Date(resourceMockSingle.updatedTimestamp),
    labels: {
        agent_discovered_arch: resourceMockSingle.labels.agent_discovered_arch,
        agent_discovered_hostname: resourceMockSingle.labels["agent.discovered.hostname"],
        agent_discovered_os: resourceMockSingle.labels.agent_discovered_os
    },
    metadata: resourceMockSingle.metadata
}

export class resourcesMock {
    collection: Resources = resourceMockCollection;
    single: Resource = resource;
    test:Resources = testResourceMock;
    boundResource = boundResource;
    page: number;
    size: number;

    /**
     * Handle routes for mocked resources
     * @param url string
     * @param method string
     * @param request HttpRequest<any>
     * @param next any
     */
    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        const urlParams = new URLSearchParams(new URL(request.urlWithParams).search)
        this.page = +urlParams.get('page');
        this.size = +urlParams.get('size');
        switch (true) {
            case url.includes('/resources') && method === 'GET' && this.size > 0:
                return new HttpResponse({ status: 200, body: (this.getResources(this.size, this.page) as any) });
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'GET':
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'PUT':
                return new HttpResponse({ status: 200, body: (this.getResource() as any) });
            case url.endsWith('/resources') && method === 'POST':
                return new HttpResponse({ status: 201, body: (this.createResource() as any) });
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'HEAD':
                return new HttpResponse({ status: 201, body: (this.validateResourceId() as any) });
            case url.includes('/resources-search') && method === 'GET':
                return new HttpResponse({ status: 200, body: (this.searchResources() as any) });
            case url.match(/\/resources\/[a-zA-Z0-9-_:]+$/) && method === 'DELETE':
                return new HttpResponse({ status: 204, body: (this.deleteResource() as any) });
            default:
                return () => { return next.handle(request); }
        }
    }

    /**
     * Mock Gets a list of Resources
     * @param size
     * @param page
     * @returns list of resources
     */
    getResources(size: number, page: number) {
        let resources: Resources;
        let mocks = Object.assign({}, this.collection);
        let slicedData = [...mocks.content.slice(page * size, (page + 1) * size)];
        resources = mocks;
        resources.content = slicedData;
        return resources;
    }

    /**
    * Mocks Single Resource
    */
    getResource() {
        return this.single;
    }

    /**
    * Mocks single created Resource
    */
    createResource() {
        return this.single;
    }

    updateResource() {
        return this.single;
    }

    validateResourceId() {
        return throwError(new HttpErrorResponse({
            error: 'Not Found',
            status: 404
        }));
    }

    searchResources() {
        let resources: Resources;
        let mocks = Object.assign({}, this.collection);
        let slicedData = [...mocks.content.slice(0 * 10, 1 * 10)];
        resources = mocks;
        resources.content = slicedData;
        return resources;
    }

    /**
     *  Mock Delete Resource
     * @returns true
     */
    deleteResource() {
        return true;
    }
}
