import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaResolver } from './_features/monitors/monitor.resolve';
import { FeatureFlag } from '../app/_guards/feature-flag.guard';

const routes: Routes = [
  { path: 'resources', loadChildren: () => import('./_features/resources/resources.module').then(m => m.ResourcesModule),
    canLoad : [FeatureFlag],
    data: {
      breadcrumb: 'RESOURCES',
      featureFlag: 'resources'
    }
  },
  { path: 'monitors', loadChildren: () => import('./_features/monitors/monitors.module').then(m => m.MonitorsModule),
    canLoad : [FeatureFlag],
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
    canLoad : [FeatureFlag],
    data: {
      breadcrumb: 'ADMIN',
      featureFlag: 'admin'
    }, resolve: {schema: SchemaResolver }
  },
  { path: '', redirectTo: '/visualize', pathMatch: 'full'},
  { path: '**', redirectTo: '/visualize'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
