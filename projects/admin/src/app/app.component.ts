import { Component } from '@angular/core';

import { ImpersonationService } from './_services/tenant/impersonation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private impService : ImpersonationService) {  }
  title = 'admin';

  rackerToken : 'AAA1IKRogbrjVG0OpZ-0RKiN9xCuV7gVgawFeQBl0bfOuGjAKxzgSb8xua1yjt092OwYIDs6R7Ggob8RgFrnW7t79i7rc2R1BXmdReGfnTVyjPXHg-OAbqb2LWn3ByycEeIjotLro1Kr7mEvJd_dcTL2fmrRCpsgGNU';
  name: string;
  myClickFunction(event) {
    if(typeof event.target.value === 'number') {
      let tenantId = event.target.value;
    }

    let data = {
      "RAX-AUTH:impersonation" : {
        user : {
          username : 'walterwhite'
        }
      }
    }

    this.impService.getImpersonationToken(data, this.rackerToken)
        .subscribe(data => {
          console.log("data get impersonation ", data);
        })
    
  }

}
