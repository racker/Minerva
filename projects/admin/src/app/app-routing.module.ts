import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth/auth.guard';
import { SchemaResolver } from 'src/app/_features/monitors/monitor.resolve';
import { DashboardComponent } from 'projects/admin/src/app/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuardService]
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
