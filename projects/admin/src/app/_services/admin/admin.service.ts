import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AdminUser } from 'projects/admin/src/app/_model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private _user: AdminUser | firebase.default.User;

  get user(): AdminUser | firebase.default.User {
    return this._user
  }

  set user(value: AdminUser | firebase.default.User) {
    this._user = value;
  }
}
