import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MinervaApiService } from '@minerva/_services/minervaApi/minerva-api.service';
import { TimeRange } from '@minerva/_models/timerange';

interface Visualize {
  metricName?: string
  date: TimeRange
}


@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage implements OnInit {

  visualize: Visualize = {
    date: {}
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.visualize.date = {
        start: params.start,
        end: params.end,
        duration: params.duration
      };
    })
  }
}
