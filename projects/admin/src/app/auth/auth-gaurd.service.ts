import { Injectable } from "@angular/core";
import { CanActivate , Router} from "@angular/router";
import {PortalDataService  } from "../../../../../src/app/_services/portal/portal-data.service";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private prtDataSrvc: PortalDataService, public  afAuth:  AngularFireAuth, private route:Router){

    }

    async canActivate(): Promise<boolean> {

        const user = await this.afAuth.currentUser;
        const provider = new firebase.default.auth.SAMLAuthProvider('saml.rackspacesso');

        const isLoggedIn = user;

        if (isLoggedIn) {
            console.log("Authenticated yah");
        }
        else {
            // not signed in.
            console.log("Authentication Required");
            //set auth persistence to session

            firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.NONE)
                .then(function () {
                    firebase.default.auth().signInWithRedirect(provider);
                })
                .catch(function (error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                });
        }
        return true;
    }
}