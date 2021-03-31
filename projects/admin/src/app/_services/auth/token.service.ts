import { Injectable } from '@angular/core';
@Injectable()
export class TokenService {
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public setToken(token:any) {
      localStorage.setItem('token', token);
    // get the token
  }
}