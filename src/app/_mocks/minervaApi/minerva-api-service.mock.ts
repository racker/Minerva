import { HttpRequest, HttpResponse } from "@angular/common/http";

export class MinervaApiMock {
    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
    switch (true) {
      case url.includes('tenant-metadata'):
        return new HttpResponse({ status: 200, body: ({
          "id": "864db581-4111-4e0c-8af2-3140474db762",
          "tenantId": "-85418",
          "accountType": "Global",
          "metadata": {
            "description": "testtenant"
          },
          "createdTimestamp": "2020-12-01T09:32:09.599197Z",
          "updatedTimestamp": "2020-12-01T09:32:09.599204Z"
        } as any) });
      default:
        return new HttpResponse({ status: 200, body: ({msg: "Minerva Api"} as any) });
          // need to call from the json
     
    } 
    }
}