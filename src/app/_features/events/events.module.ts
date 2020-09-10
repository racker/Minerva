import { NgModule } from '@angular/core';
import { EventsService } from '../../_services/events/events.service';
import { EventslistComponent } from './components/list/eventslist.component';
import { SharedModule } from '../../_shared/shared.module';
import { EventDetailsComponent } from '../events/components/event-details/event-details.component';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './components/event-create/event-create.component';

const routes: Routes=[
  { path: 'newevent', component:EventCreateComponent,
    data: {
      breadcrumb: 'CREATE EVENT'
    }
  },
]

@NgModule({
  declarations: [EventDetailsComponent,EventslistComponent, EventCreateComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    EventsService
  ],
  exports:[
    EventslistComponent,
    EventDetailsComponent,
    EventCreateComponent
  ]
})
export class EventsModule { }
