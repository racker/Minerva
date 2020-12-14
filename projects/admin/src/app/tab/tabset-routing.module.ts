import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsetComponent } from './tabset.component';
import { AdminResourceDetailsPage } from './_features/resources/pages/details/admin-resource-details.page';
import { DetailsComponent } from './_features/monitors/pages/details/details.component';
import { EventDetailsComponent } from "./_features/events/event-details/event-details.component";
import { TenantMetadataListComponent } from './_features/tenantMetadata/pages/tenant-metadata-list/tenant-metadata-list.component';


const routes: Routes = [
  {
    path: '',
    component: TabsetComponent,
    data: {
      breadcrumb: ''
    }
  },
  {
    path: 'resources/:id',
    component: AdminResourceDetailsPage,
    data: {
      breadcrumb: ''
    }
  },
  {
    path: 'monitors/details/:id', component: DetailsComponent,
    data: {
      breadcrumb: ''
    }
  },
  {
    path: 'event/details/:id', component: EventDetailsComponent,
    data: {
      breadcrumb: ''
    }
  },
   { path: 'event', loadChildren: () => import('../../../../../src/app/_features/events/events.module').then(m => m.EventsModule),
    data: {
      breadcrumb: 'Event'
    }
  },
  {
    path:'tenanttmetadata', component: TenantMetadataListComponent,
    data: {
      breadcrumb: 'Metadata'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TabRoutingModule { }
