import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../_services/events/events.service';
import { SharedModule } from '../../_shared/shared.module';
import { EventDetailsComponent } from '../events/components/event-details/event-details.component';
import { RouterModule } from '@angular/router';
import { routes } from "./events.route";

@NgModule({
  declarations: [EventDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    EventsService
  ]
})
export class EventsModule { }
