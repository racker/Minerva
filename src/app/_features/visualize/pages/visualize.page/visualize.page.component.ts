import { Component } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MinervaApiService } from '@minerva/_services/minervaApi/minerva-api.service';

enum QUERYPARAMS {
  GROUP='group',
  METRIC='metric'
}

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

  ddMetric
  public fields
  loading: boolean;
  subManager = new Subscription();
  public metrics = [];
  public metricGrp = [];
  public groupPillSet = new Set();
    public metricPillSet = new Set();
  MetricQuery: [string]; //query
  groupQuery:[string];

  constructor(private metricService: MetricsService,
    private router: Router,
    private route: ActivatedRoute,
    private mnrvaApi: MinervaApiService,
    private privatemtrsrvc: MetricsService) {

  }

  ngOnInit() {

    // if url with query parameter or change in query parameter
    this.route.queryParams.subscribe(params => {
      if(!!params[QUERYPARAMS.GROUP]){
        this.groupQuery=params[QUERYPARAMS.GROUP].split(",");
        if(this.groupPillSet.size===0){
          this.groupPillSet.add(params[QUERYPARAMS.GROUP])
        }
        this.getlistOfMetric(params[QUERYPARAMS.GROUP]);
      }
    
      if (!!params[QUERYPARAMS.METRIC]) {
        this.MetricQuery = params[QUERYPARAMS.METRIC].split(",");
        if(this.metricPillSet.size===0){
        this.metricPillSet= new Set(params[QUERYPARAMS.METRIC].split(","));
        }
      }
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
    if (!!group) {
      // new Instance while group selection
     this.reset();
      this.groupPillSet.add(group);
      this.addGroupinQuery();
    }

  }
  public reset(){
    this.groupPillSet = new Set();
    this.metricPillSet = new Set();
  }
  /**
   * Metric Selection
   * @param metric Name of Metric
   */
  public metricSelection(metric) {
    if (!!metric) {
      this.metricPillSet.add(metric);
      this.addMetricInQuery();
    }
  }

  addMetricInQuery() {
    if ([...this.metricPillSet].length > 0) {
      const queryParams: Params = { metric: [...this.metricPillSet].join(',') }; // metric name query params  
      this.changingQueryParams(queryParams, QUERYPARAMS.METRIC);
    } else {
      this.addGroupinQuery();
    }
  }

  addGroupinQuery() {
    const queryParams: Params = { group: [...this.groupPillSet].join(',') };
    this.changingQueryParams(queryParams, '');
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
    this.metrics = [];
    this.groupPillSet.delete(data);
    this.metricPillSet = new Set();
    this.addMetricInQuery();

  }
  //Dismiss of metric pills
  dismissMetric(data) {
    this.metricPillSet.delete(data);
    this.addMetricInQuery();
  }

  defaultgroup(item) {
    if ( !!this.groupQuery && item == this.groupQuery[this.groupQuery.length - 1])
      return true;
  }
  defaultMetric(item) {
    if (!!this.MetricQuery && item == this.MetricQuery[this.MetricQuery.length - 1])
      return true;
  }

}