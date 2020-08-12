import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../_services/events/events.service';
import { EventslistComponent } from './components/list/eventslist.component';

@NgModule({
  declarations: [EventslistComponent],
  imports: [
    CommonModule
  ],
  providers:[
    EventsService
  ],
  exports:[
    EventslistComponent
  ]
})
export class EventsModule { }
