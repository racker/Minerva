import { Component, Inject, ViewChild } from '@angular/core';
import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { impUser } from './_model/impersonationModel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //@ViewChild(DashboardComponent) child:DashboardComponent;
  constructor(public impService : ImpersonationService, private _router: Router, private tokenService : TokenService) {
  }
  title = 'admin';
  _component: any;
  componentsList = [];
  name: string;
  xAuthToken : string;
  raxToken : string;
  data : impUser;
  myClickFunction() {



  //   this.data = {
  //     "RAX-AUTH:impersonation" : {
  //       user : {
  //         username : 'walterwhite'
  //       }
  //     }
  //   }
  //     // TODO : After tenant lookup, we got the racker token from an api or service called identity tokens and needs to be set into raxToken property.

  //   this.raxToken = 'AADRqXSYnU2s5vwXPSqRd_gGQOUxKbwIjxQ7Es2qVnUGlp9Ghp7cUPiDH8baVYw_vdOiJsnAndn4lxdm2hsAVnmt-N5DbTPEJB22rI9E5eflZDh7jMmXx7fW';
  //   this.impService.getImpersonationToken(this.data, this.raxToken)
  //       .subscribe(data => {
  //         this.xAuthToken = data['access'].token.id;
  //         this.tokenService.setToken = this.xAuthToken;
  //         //this.child.loadTabComponent('RESOURCES');
  //       })
  // }
}
}

