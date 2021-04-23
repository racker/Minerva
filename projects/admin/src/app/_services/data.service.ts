
import { Injectable,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResourcesListComponent } from 'src/app/_features/resources/components/list/resourceslist.component';
import { MonitorslistComponent } from 'src/app/_features/monitors/components/list/monitorslist.component';

@Injectable({ providedIn: 'root' })

export class DataService {
    private messageSource = new BehaviorSubject<string>("default");
    messageSource$ = this.messageSource.asObservable();

  constructor(private cfr: ComponentFactoryResolver) {}
  _component: any;

    changeComponentName(message: string) {
        this.messageSource.next(message);
    }
    
    getComponentName(): Observable<any> {
        return this.messageSource.asObservable();
    }

  async loadComponent(vcr: ViewContainerRef, messageSource: string) {
      this._component = "";
      if (messageSource == "RESOURCES")
        this._component = ResourcesListComponent;
      else if (messageSource == "MONITORS")
        this._component = MonitorslistComponent;
    vcr.clear();   
    return vcr.createComponent(
    this.cfr.resolveComponentFactory(this._component))    
}}