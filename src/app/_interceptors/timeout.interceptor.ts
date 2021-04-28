import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { EnvironmentConfig } from "../_services/config/environmentConfig.service";

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  constructor() { }

  // default timeout of 10 seconds
  // To use http.get('<URL>', { headers: new HttpHeaders({ timeout: 20000 }) });
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = req.headers.get('timeout') || 10000;
    const timeoutValueNumeric = Number(timeoutValue);

    return next.handle(req).pipe(timeout(timeoutValueNumeric));
  }
}