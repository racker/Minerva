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
  @ViewChild(DashboardComponent) child:DashboardComponent;
  constructor(public impService : ImpersonationService, private _router: Router, private tokenService : TokenService, @Inject('Window') private window: Window) {  
  }
  title = 'admin';
  _component: any;
  componentsList = [];
  name: string;
  xAuthToken : string;
  raxToken : string;
  data : impUser;

  ngOnInit(): void {
    this.window['PORTAL_DATA'] = {isRacker:false, domainId: '7799042', tenants:['cloud:7799042']}; // TODO : tenantId (7799042) will be from account search input field.
  }
  myClickFunction() {
   
    this.data = {
      "RAX-AUTH:impersonation" : {
        user : {
          username : 'walterwhite'
        }
      }
    }
      // TODO : After tenant lookup, we got the racker token from an api or service called identity tokens and needs to be set into raxToken property.

    this.raxToken = 'AADU-8A-3pi8q4BIWfX2snQdcWEHye--dIEBnMD2MUX4I69hvt0lpx5W1P2E-jqIMtFmqslldMEtsxXUsl3P9pPhbjAohNON4PNQDrYyn7o7cpXIaiFyByEc';
    this.impService.getImpersonationToken(this.data, this.raxToken)
        .subscribe(data => {
          this.xAuthToken = data['access'].token.id;
          this.tokenService.setToken = this.xAuthToken;
          this.child.loadTabComponent('RESOURCES');
        })           
  }
}

