import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../_services/events/events.service';
import { EventslistComponent } from './components/list/eventslist.component';
import { SharedModule } from '../../_shared/shared.module';
import { EventDetailsComponent } from '../events/components/event-details/event-details.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [EventDetailsComponent,EventslistComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  providers:[
    EventsService
  ],
  exports:[
    EventslistComponent,
    EventDetailsComponent
  ]
})
export class EventsModule { }
