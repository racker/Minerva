import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { GraphsComponent } from './components/graphs/graphs.component';
import { VisualizePage } from './pages/visualize.page/visualize.page.component';
import { MetricsService } from '../../_services/metrics/metrics.service';
import { TimeRangeComponent } from './components/timerange/timerange.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MetricDropdownComponent } from './components/selectNav/metric-group/metric-dropdown.component';



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
  declarations: [
    GraphsComponent,
    VisualizePage,
    TimeRangeComponent,
    MetricDropdownComponent,
  ],
  imports: [
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MetricsService
  ]
})
export class VisualizeModule {
  constructor() {

  }

  ngOnInit() {

  }

}
