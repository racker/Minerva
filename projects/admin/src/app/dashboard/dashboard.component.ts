import { Component, ViewChild } from '@angular/core';
import { DashboardDirective } from '../_services/dashboard.directive';
import { DataService } from '../_services/data.service';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
//https://www.youtube.com/watch?v=I317BhehZKM
export class DashboardComponent {
  @ViewChild(DashboardDirective, { static: true })
  dashboard: DashboardDirective;
  private destroySubject = new Subject();
  constructor(private dataSer:DataService) {
      this.dataSer.getComponentName().subscribe(messageSource => {
        if(messageSource != 'default') {
          const viewContainerRef = this.dashboard.viewContainerRef;
          this.dataSer.messageSource$
          .pipe(
            takeUntil(this.destroySubject),
            mergeMap(messageSource => this.dataSer.loadComponent(viewContainerRef, messageSource))
          )
          .subscribe();  
        }
    });
   }

   myfunc() {
     console.log("inside my func");
   }

  }
