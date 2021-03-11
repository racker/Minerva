import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaResolver } from './_features/monitors/monitor.resolve';

const routes: Routes = [
  { path: 'resources', loadChildren: () => import('./_features/resources/resources.module').then(m => m.ResourcesModule),
    data: {
      breadcrumb: 'RESOURCES'
    }
  },
  { path: 'monitors', loadChildren: () => import('./_features/monitors/monitors.module').then(m => m.MonitorsModule),
    data: {
      breadcrumb: 'MONITORS'
    }, resolve: {schema: SchemaResolver }
  },
  { path: 'visualize', loadChildren: () => import('./_features/visualize/visualize.module').then(m => m.VisualizeModule),
    data: {
      breadcrumb: 'VISUALIZE'
    }
  },
  { path: '', redirectTo: '/resources', pathMatch: 'full'},
  { path: '**', redirectTo: '/resources'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
