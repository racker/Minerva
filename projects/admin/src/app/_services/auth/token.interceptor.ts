// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authToken: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    if(this.authToken.getToken !== null) {
      headers = new HttpHeaders({
        'X-Auth-Token': this.authToken.getToken,
      });
    }

  request = request.clone({headers});
    return next.handle(request);
  }
}