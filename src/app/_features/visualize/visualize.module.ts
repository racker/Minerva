import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { GraphsComponent } from './components/graphs/graphs.component';
import { VisualizePage } from './pages/visualize.page/visualize.page.component';
import { MetricsService } from '../../_services/metrics/metrics.service';
import { InfluxService } from '../../_services/influx/influx.service';
import { SelectionsComponent } from './components/selections/selections.component';

const routes: Routes = [
  {
      path: '',
      component: VisualizePage,
      data: {
        breadcrumb: 'GRAPHS'
      }
  }
];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [GraphsComponent, VisualizePage, SelectionsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MetricsService,
    InfluxService
  ]
})
export class VisualizeModule { }
