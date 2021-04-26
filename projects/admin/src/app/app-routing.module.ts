import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth/auth.guard';
import { SchemaResolver } from 'src/app/_features/monitors/monitor.resolve';
import { DashboardComponent } from 'projects/admin/src/app/dashboard/dashboard.component';
import { AdminResourceDetailsPage } from 'projects/admin/src/app/dashboard/_features/resources/pages/details/admin-resource-details.page';
import { DetailsComponent } from './dashboard/_features/monitors/pages/details/details.component';
const routes: Routes = [
  {
    path:'', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'dashboard/resources/:id',
    component: AdminResourceDetailsPage,
    data: {
      breadcrumb: ''
    }
  },
  {
    path: 'dashboard/monitors/details/:id',
    component: DetailsComponent,
    data: {
      breadcrumb: ''
    }
  },

  /*
    data:{
      breadcrumb: null
    }, resolve: {schema: SchemaResolver },
    canActivate:[AuthGuardService],
  },
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
