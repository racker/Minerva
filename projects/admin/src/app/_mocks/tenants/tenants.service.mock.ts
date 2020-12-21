import { default as tenantMetadataList } from './collection.json';
import { TenantMetadata } from '../../_model/tenantMetaData';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export class TenantMock {
    tenantMetadata: TenantMetadata = tenantMetadataList.content[0];

    /**
         * Handle routes for mocked resources
         * @param url string
         * @param method string
         * @param request HttpRequest<any>
         * @param next any
         */
    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        switch (true) {
            case method === 'POST':
                return new HttpResponse({ status: 200, body: (this.createTenant() as any) });
            default:
                return () => { return next.handle(request); }
        }
    }

    createTenant() : TenantMetadata {
        return this.tenantMetadata;
    }

}
