import { Component } from '@angular/core';

import { ImpersonationService } from './_services/tenant/impersonation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public impService : ImpersonationService, private _router: Router) {  }
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

    this.raxToken = 'AAD6zGDyszQ85Ru5wOy4A_sKv0JXLJt010o6q3VHa1lWen8DhbOifWPF94Fyy8de0Mc09KNsXqJP6V9oKU-X8JTIQoCxHn8G4bWljwRDcLocOSlJP0RY5ni5';
    this.impService.getImpersonationToken(data, this.raxToken)
        .subscribe(data => {
        this.xAuthToken = data['access'].token.id;
        })
  }

}
