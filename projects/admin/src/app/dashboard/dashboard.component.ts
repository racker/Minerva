import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardDirective } from '../_services/dashboard.directive';
import { DataService } from '../_services/data.service';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import HelixUI from 'helix-ui';
export enum TAB {
  RESOURCES = "RESOURCES",
  MONITORS = "MONITORS",
}

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
//https://www.youtube.com/watch?v=I317BhehZKM
export class DashboardComponent {
  @ViewChild(DashboardDirective, { static: true })
  dashboard: DashboardDirective;



  public tabCount=0;

  @ViewChild('tab') el: ElementRef;
  @ViewChild('tab1Content', {read: ViewContainerRef}) dynamicTabPlaceholder;
  @ViewChild('tab2Content', {read: ViewContainerRef}) dynamicTabPlaceholder2;

  private destroySubject = new Subject();
  constructor(private dataSer: DataService) {
    this.dataSer.getComponentName().subscribe(messageSource => {
      if (messageSource != 'default') {
        // const viewContainerRef = this.dashboard.viewContainerRef;
        if( messageSource === TAB.RESOURCES)
        this.dataSer.loadComponent(this.dynamicTabPlaceholder, messageSource).then((data) =>{
        });
        if( messageSource === TAB.MONITORS)
        this.dataSer.loadComponent(this.dynamicTabPlaceholder2, messageSource).then((data) =>{
        });

        // this.dataSer.messageSource$
        //   .pipe(
        //     takeUntil(this.destroySubject),
        //     mergeMap(messageSource => 
        //       this.dataSer.loadComponent(viewContainerRef, messageSource)
        //       )
        //   )
        //   .subscribe();
      }
    });
  }

  selectedTab() {
    switch (this.el.nativeElement.currentTab) {
      case 0:
        this.tabCount=this.el.nativeElement.currentTab;
        this.dataSer.changeComponentName(TAB.RESOURCES);
        break;
      case 1:
        this.tabCount=this.el.nativeElement.currentTab;
        this.dataSer.changeComponentName(TAB.MONITORS);
        break;
      case 2:
      break;
      default:
        break;
    }
    console.log(this.el.nativeElement.currentTab);
  }
  myfunc() {
    console.log("inside my func");
  }

}
