import { Component, Inject } from '@angular/core';

import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public impService : ImpersonationService, private _router: Router, private tokenService : TokenService) {  }
  title = 'admin';
  name: string;
  xAuthToken : string;
  raxToken : string;
  myClickFunction(event) {
   
    let data = {
      "RAX-AUTH:impersonation" : {
        user : {
          username : 'walterwhite'
        }
      }
    }
      // TODO : After tenant lookup, we got the racker token from an api or service called identity tokens and needs to be set into raxToken property.

    this.raxToken = 'AABcX-sOFSVZVN1v2sKUIWbPjpy_DoXSmVn4imLgLYg13T0c_oSSLM7mlV1MrcZU0S6uhzyS8MdYySd5j2xIgT9huFDXcMj-1tyWwNXW8gKGtKyFOowZ_3Zz';
    this.impService.getImpersonationToken(data, this.raxToken)
        .subscribe(data => {
          this.xAuthToken = data['access'].token.id;
          this.tokenService.setToken = this.xAuthToken;
        })           
  }
}
