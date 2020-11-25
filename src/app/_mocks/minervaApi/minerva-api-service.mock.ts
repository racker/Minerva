import { HttpRequest, HttpResponse } from "@angular/common/http";

export class MinervaApiMock {
    handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        return new HttpResponse({ status: 200, body: ({msg: "Minerva Api"} as any) });
    // switch (true) {
    //   case url.includes('/intelligence'):
    //     return new HttpResponse({ status: 200, body: ({msg: "Minerva Api"} as any) });
    //   default:
    //     return () => { return next.handle(request); }
    // } 
    }
}