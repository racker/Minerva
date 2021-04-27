import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from '../_services/data.service';
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

  constructor(private dataSer: DataService) {}

  ngAfterViewInit(){
    this.dataSer.getComponentName().subscribe(messageSource => {
      if (messageSource) {
        this.dataSer.loadComponent(this.foucsedViewContainer?this.foucsedViewContainer:this.dynamicTabPlaceholder, messageSource);
      }
    });
  }

  selectedTab(selectedItem) {
    switch (selectedItem) {
      case TAB.RESOURCES:
        this.foucsedViewContainer = this.dynamicTabPlaceholder;
        this.dataSer.changeComponentName(TAB.RESOURCES);
        break;
      case TAB.MONITORS:
        this.foucsedViewContainer = this.dynamicTabPlaceholder2;
        this.dataSer.changeComponentName(TAB.MONITORS);
        break;
        case TAB.METADATA:
          this.foucsedViewContainer = this.dynamicTabPlaceholder3;
          this.dataSer.changeComponentName(TAB.MONITORS);
          break;
      default:
        break;
    }
  }
}
