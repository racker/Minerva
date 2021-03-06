import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [EventDetailsComponent,EventslistComponent,EventCreateComponent],
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
