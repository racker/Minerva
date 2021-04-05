import { Injectable } from '@angular/core';
@Injectable()
export class TokenService {
  public token:string;
  constructor() { }

  get getToken(): string {
    return this.token;
  }
  set setToken(token:string) {
    this.token=token;
    // get the token
  }
}