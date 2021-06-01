import { Component } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TimeRange } from '@minerva/_models/timerange';

interface Visualize {
  metricName?: string
  groupQuery:string[];

  metricQuery?: string[]; //query

  date: TimeRange
}


export enum QUERYPARAMS {
  GROUP='group',
  METRIC='metric'
}

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage {

  ddMetric
  public metrics = [];
  public metricGrp = [];
  public groupPillSet = new Set();
    public metricPillSet = new Set();
  visualize: Visualize = {
    date: {},
    groupQuery: []
  };

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private privatemtrsrvc: MetricsService) {

  }

  ngOnInit() {

    // if url with query parameter or change in query parameter
    this.route.queryParams.subscribe(params => {
      this.setQueryParams(params);
    });
    this.privatemtrsrvc.getMetricGroupList().subscribe((d) => {
      this.metricGrp = d;

    });
  }

  /**
   * After subscribe set visual data from Query params
   * @param params subscribed queryParams
   */
  setQueryParams(params:any){
    this.visualize.date = {
      start: params.start,
      end: params.end,
      duration: params.duration
    };

    if(!!params[QUERYPARAMS.GROUP]){
      this.visualize.groupQuery=params[QUERYPARAMS.GROUP].split(",");
      if(this.groupPillSet.size===0){
        this.groupPillSet.add(params[QUERYPARAMS.GROUP])
      }
      this.getlistOfMetric(params[QUERYPARAMS.GROUP]);
    }

    if (!!params[QUERYPARAMS.METRIC]) {
      this.visualize.metricQuery = params[QUERYPARAMS.METRIC].split(",");
      if(this.metricPillSet.size===0){
      this.metricPillSet= new Set(params[QUERYPARAMS.METRIC].split(","));
      }
    }
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
      this.changingQueryParams(queryParams, 'merge');
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
    if ( !!this.visualize.groupQuery && item == this.visualize.groupQuery[this.visualize.groupQuery.length - 1])
      return true;
  }
  defaultMetric(item) {
    if (!!this.visualize.metricQuery && item == this.visualize.metricQuery[this.visualize.metricQuery.length - 1])
      return true;
  }

}
