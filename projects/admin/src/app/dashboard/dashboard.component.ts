import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentService } from '../_services/dynamicComponent.service';
export enum TAB {
  RESOURCES = "RESOURCES",
  MONITORS = "MONITORS",
  METADATA='METADATA'
}

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
//https://www.youtube.com/watch?v=I317BhehZKM
export class DashboardComponent implements AfterViewInit{
  @ViewChild('tab1Content', { read: ViewContainerRef }) dynamicTabPlaceholder;
  @ViewChild('tab2Content', { read: ViewContainerRef }) dynamicTabPlaceholder2;
  @ViewChild('tab3Content', { read: ViewContainerRef }) dynamicTabPlaceholder3;
  foucsedViewContainer: ViewContainerRef;
  tabs=TAB;

  constructor(private dataSer: DynamicComponentService) {}

  ngAfterViewInit(){
    this.dataSer.getComponentName().subscribe(messageSource => {
      if (messageSource) {
        this.dataSer.loadComponent(this.foucsedViewContainer?this.foucsedViewContainer:this.dynamicTabPlaceholder, messageSource);
      }
    });
  }

  selectedTab(tab:string) {
    switch (tab) {
      case this.tabs.RESOURCES:
        this.foucsedViewContainer = this.dynamicTabPlaceholder;
        this.dataSer.changeComponentName(this.tabs.RESOURCES);
        break;
      case this.tabs.MONITORS:
        this.foucsedViewContainer = this.dynamicTabPlaceholder2;
        this.dataSer.changeComponentName(this.tabs.MONITORS);
        break;
        case this.tabs.METADATA:
          this.foucsedViewContainer = this.dynamicTabPlaceholder3;
          this.dataSer.changeComponentName(this.tabs.MONITORS);
          break;
      default:
        break;
    }
  }
}
