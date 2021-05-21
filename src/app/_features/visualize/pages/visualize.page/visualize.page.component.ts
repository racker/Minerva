import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MinervaApiService } from '@minerva/_services/minervaApi/minerva-api.service';

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage {


  system: string;
  measurement: string;
  device: string;
  start: string;
  end: string;

  public fields
  loading: boolean;
  subManager = new Subscription();
  public metrics = [];
  public metricGrp = [];
  public groupSet;
  public metricSet;

  constructor(private metricService: MetricsService,
    private router: Router,
    private route: ActivatedRoute,
    private mnrvaApi: MinervaApiService,
    private privatemtrsrvc: MetricsService) {
  }

  ngOnInit() {

    // if url with query parameter or change in query parameter
    this.route.queryParams.subscribe(params => {
      params["group"] && this.getlistOfMetric(params["group"]);
    });
    this.privatemtrsrvc.getMetricGroupList().subscribe((d) => {
      this.metricGrp = d;

    });
  }


  /**
   * Metric group selection
   * @param group name of group
   */
  public groupSelection(group) {
    // new Instance while group selection
    this.groupSet = new Set();
    this.metricSet = new Set();
    this.groupSet.add(group);
    this.getlistOfMetric(group);
    const queryParams: Params = { group: group };
    this.changingQueryParams(queryParams, '');

  }
  /**
   * Metric Selection
   * @param metric Name of Metric
   */
  public metricSelection(metric) {
    this.metricSet.add(metric);
    const queryParams: Params = { metric: [...this.metricSet].join(',') }; // metric name query params  
    this.changingQueryParams(queryParams, 'merge');
  }

  // Get list of metric on the basis of Group
  getlistOfMetric(group) {
    this.privatemtrsrvc.getMetricList(group).subscribe((d) => {
      this.metrics = d;
    })
  }


  /**
   *  add query parameter in route
   * @param data 
   * @param qryPrmHndlr 
   */
  changingQueryParams(data: Params, qryPrmHndlr: any) {

    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: data,
        queryParamsHandling: qryPrmHndlr, // remove to replace all query params by provided
      });
  }

  //Dismiss of group pills
  dismissGroup(data) {
    this.groupSet.delete(data);
  }
  //Dismiss of metric pills
  dismissMetric(data) {
    this.metricSet.delete(data);
  }

}