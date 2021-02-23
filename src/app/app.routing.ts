import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaResolver } from './_features/monitors/monitor.resolve';

const routes: Routes = [
  { path: 'resources', loadChildren: () => import('./_features/resources/resources.module').then(m => m.ResourcesModule),
    data: {
      breadcrumb: 'RESOURCES',
      featureFlag: 'resources'
    }
  },
  { path: 'monitors', loadChildren: () => import('./_features/monitors/monitors.module').then(m => m.MonitorsModule),
    data: {
      breadcrumb: 'MONITORS',
      featureFlag: 'monitors'
    }, resolve: {schema: SchemaResolver }
  },
  { path: 'visualize', loadChildren: () => import('./_features/visualize/visualize.module').then(m => m.VisualizeModule),
    data: {
      breadcrumb: 'VISUALIZE',
      featureFlag: 'visualize'
    }
  },
  {
    path:'admin', loadChildren:() => import('projects/admin/src/app/app.module').then(m =>m.AppModule),
    data: {
      breadcrumb: 'ADMIN',
      featureFlag: 'admin'
    }, resolve: {schema: SchemaResolver }
  },
  { path: '', redirectTo: '/resources', pathMatch: 'full'},
  { path: '**', redirectTo: '/resources'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
