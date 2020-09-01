import { NgModule } from '@angular/core';
import { EventsService } from '../../_services/events/events.service';
import { EventslistComponent } from './components/list/eventslist.component';
import { SharedModule } from '../../_shared/shared.module';
import { EventDetailsComponent } from '../events/components/event-details/event-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
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
