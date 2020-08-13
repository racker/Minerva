import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../_services/events/events.service';
import { SharedModule } from '../../_shared/shared.module';
import { EventDetailsComponent } from '../events/components/event-details/event-details.component';
import { RouterModule, Routes } from '@angular/router';


 const routes: Routes = [
  {
      path: '',
      component: EventDetailsComponent,
      data: {
        breadcrumb: ''
      }
  }
];
@NgModule({
  declarations: [EventDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    EventsService
  ]
})
export class EventsModule { }
