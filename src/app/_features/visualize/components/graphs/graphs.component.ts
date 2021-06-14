import { Component, Input, OnInit } from '@angular/core';
import { QueryMetricResponse } from '@minerva/_models/metrics';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {


  JSON: JSON = JSON;

  metrics$: Observable<QueryMetricResponse[]>

  data: string;

  constructor(private metricService: MetricsService) { }

  ngOnInit() {
    this.metrics$ = this.metricService.getMetrics$();
  }

}
