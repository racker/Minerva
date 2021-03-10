import { Inject, Injectable } from "@angular/core";
import { LoggingService } from '../../../../../../src/app/_services/logging/logging.service';
import { LogLevels } from '../../../../../../src/app/_enums/log-levels.enum';
import { CanActivate } from "@angular/router";
import { AdminService } from "../admin/admin.service";
import { DOCUMENT, Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from "../../../../../../env/environment";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private adminService: AdminService, private readonly loggingService: LoggingService,
        public  afAuth:  AngularFireAuth, @Inject(DOCUMENT) private document: Document,
        private location: Location){

    }

    async canActivate(): Promise<boolean> {
        return true;

        if (environment.mock) {
            return true;
        }

        let firebaseUser = await this.afAuth.currentUser;
        let user = this.adminService.user || firebaseUser;

        // is this user already authenticated?
        if (user) {
            this.adminService.user = user;
            return true;
        }

        const provider = new firebase.default.auth.SAMLAuthProvider('saml.rackspacesso');
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                //set auth persistence to none - https://firebase.google.com/docs/auth/web/auth-state-persistence
                await firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.NONE)
                // redirect the user to login page
                let result = await firebase.default.auth().getRedirectResult();
                firebase.default.auth().onAuthStateChanged((authUser) => {
                    if (authUser) {
                        // Already signed in.
                        user = {
                            samAccountName: result.additionalUserInfo.profile["samAccountName"],
                            CommonName: result.additionalUserInfo.profile["CommonName"],
                            emailaddress: result.additionalUserInfo.profile["emailaddress"],
                            authorized: true
                        };
                        this.adminService.user = user;
                        resolve(true)
                    } else {
                        this.location.replaceState('/admin');
                        firebase.default.auth().signInWithRedirect(provider);
                    }
                }, (e) => {
                    reject(e);
                });
            } catch(e) {
                this.loggingService.log(e.message, LogLevels.error);
                reject(e);
            }
        });
    }
}
