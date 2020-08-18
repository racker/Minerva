import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabRoutingModule } from './tabset-routing.module';
import { TabsetComponent } from './tabset.component';
import { AdminResourceDetailsPage } from './_features/resources/pages/details/admin-resource-details.page';
import { MonitorsModule } from 'src/app/_features/monitors/monitors.module';
import { ResourcesModule } from 'src/app/_features/resources/resources.module';
import { EventsModule } from 'src/app/_features/events/events.module';  
import { DetailsComponent } from './_features/monitors/pages/details/details.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { EventDetailsComponent } from './_features/events/event-details/event-details.component';


@NgModule({
  declarations: [TabsetComponent, AdminResourceDetailsPage, DetailsComponent, EventDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TabRoutingModule,
    MonitorsModule,
    ResourcesModule,
    EventsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsetModule { }
