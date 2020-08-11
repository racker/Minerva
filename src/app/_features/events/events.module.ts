import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../_services/events/events.service';
import { SharedModule } from '../../_shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule
  ],
  providers:[
    EventsService
  ]
})
export class EventsModule { }
