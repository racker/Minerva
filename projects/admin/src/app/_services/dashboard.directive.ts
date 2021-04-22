import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[dashboardComponent]' })
export class DashboardDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}