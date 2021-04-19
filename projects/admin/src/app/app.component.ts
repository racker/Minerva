import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from '../app/_services/data.service';
import { impUser } from './_model/impersonationModel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //@ViewChild(DashboardComponent) child:DashboardComponent;
  constructor(public impService : ImpersonationService, private _router: Router, private tokenService : TokenService, private dataSer : DataService) {
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

     this.data = {
       "RAX-AUTH:impersonation" : {
         user : {
           username : 'walterwhite'
         }
       }
     }
       // TODO : After tenant lookup, we got the racker token from an api or service called identity tokens and needs to be set into raxToken property.

     this.raxToken = 'AAAjVpYWTjFSwJGy9uMnXrzKdJ-hIYX7xkD6dkBIjR4_4olUnwumjuQ6nOwTMPLVriqbRDjwALQ7BgMRdMuZ9CeYKbbUrWZSceqhqEaOC82y4Zyq2Rsfm3lV';
     this.impService.getImpersonationToken(this.data, this.raxToken)
         .subscribe(data => {
           this.xAuthToken = data['access'].token.id;
           this.tokenService.setToken = this.xAuthToken;
           this.dataSer.changeComponentName("RESOURCES");
           //this.child.loadTabComponent('RESOURCES');
         })
   }
}


