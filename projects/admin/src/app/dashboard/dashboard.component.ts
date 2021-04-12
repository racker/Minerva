import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ResourcesListComponent } from 'src/app/_features/resources/components/list/resourceslist.component';
import { MonitorslistComponent } from 'src/app/_features/monitors/components/list/monitorslist.component';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) myRef;

  _component: any;
  componentsList = [];
  ngOnInit(): void {
  }



  loadTabComponent(_selectedTab: string) {
    // remove loaded Component
    if (!isNullOrUndefined(this.componentsList)) {
      this.componentsList.map((cm, i) => {
        let tmp = this.viewContainerRef;
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(cm));
        this.viewContainerRef.remove(i);
        this.componentsList.splice(i, 1);
      });
    }
    this._component = "";
    if (_selectedTab == "RESOURCES")
      this._component = ResourcesListComponent;
    else if (_selectedTab == "MONITORS")
      this._component = MonitorslistComponent;

    this.viewContainerRef.detach();
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this._component);

    let componentRef = this.myRef.createComponent(componentFactory);
    this.componentsList.push(componentRef);
  }


  }
