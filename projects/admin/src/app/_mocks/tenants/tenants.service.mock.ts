import { default as tenantMetadataList } from './collection.json';
import { TenantmetaData, TenantmetaDataList } from '../../_model/tenantMetaData';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export class TenantMock {
    tenantMetadata: TenantmetaData = tenantMetadataList.content[0];
    list : TenantmetaDataList = tenantMetadataList;

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
            case method === 'GET':
                return new HttpResponse({ status: 200, body: (this.metaDataList() as any) });
            default:
                return () => { return next.handle(request); }
        }
    }

    createTenant(): TenantmetaData {
        return this.tenantMetadata;
    }
    metaDataList(): TenantmetaDataList {
        return this.list;
    }
}
