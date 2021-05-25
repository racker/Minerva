import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
import { Router } from '@angular/router';
import { DashboardComponent, TAB } from './dashboard/dashboard.component';
import { DynamicComponentService } from './_services/dynamicComponent.service';
import { impUser } from './_model/impersonationModel';
const impersonateUser={
  "RAX-AUTH:impersonation" : {
    user : {
      username : 'walterwhite'
    }
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //@ViewChild(DashboardComponent) child:DashboardComponent;
  constructor(public impService : ImpersonationService,
    private _router: Router,
    private tokenService : TokenService,
    private dataSer : DynamicComponentService) {
  }
  title = 'admin';
  _component: any;
  componentsList = [];
  name: string;
  message : string;
  xAuthToken : string;
  raxToken : string;
  data : impUser;
  ngOnInit() {
  }

  searchTenant() {

       // TODO : After tenant lookup, we got the racker token from an api or service called identity tokens and needs to be set into raxToken property.

     this.raxToken = 'AACYBoCNqfYMN2CtXVrWNdAUN-KF3HTWcumCXKn9prAUYLCooaqd0fPId6Zfjc_5gp_CcfX8_EN2OwFmBRzf7WTpuvaQYq1hZPjqnyffJKdFZ25YGiZoG0sv';
     this.impService.getImpersonationToken(impersonateUser, this.raxToken)
         .subscribe(data => {
           this.xAuthToken = data['access'].token.id;
           this.tokenService.setToken = this.xAuthToken;
           this.dataSer.changeComponentName(TAB.RESOURCES);
         })
   }
}


