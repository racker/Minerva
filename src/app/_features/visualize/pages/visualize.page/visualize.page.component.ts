import { Component } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Visualize } from '@minerva/_models/metrics'
export enum QUERYPARAMS {
  GROUP = 'group',
  METRIC = 'metric',
  TAGS = 'tags'
}

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage {

  public groupPillSet = new Set();
  public metricPillSet = new Set();
  public tagPillSet = new Set();
  public defaultMetric: string;
  public defaultGroup: string;
  public defaultTags: string;
 public presetData: { key: string, value: string }[] = [
    { value: '1h', key: '1 HR' },
    { value: '8h', key: '8 HR' },
    { value: '24h', key: 'DAY' },
    { value: '7d', key: 'WEEK' },
    { value: '1n', key: 'MONTH' },
    { value: '1y', key: 'YEAR' },
  ];
  public visualize: Visualize = {
    date: {},
    group: [],
    metrics: []
  };

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private privatemtrsrvc: MetricsService) {
    this.ddMetricinit();
    this.ddGroupInit();
    this.ddTagInit();
  }

  ngOnInit() {
    // if url with query parameter or change in query parameter
    this.route.queryParams.subscribe(params => {
      this.setQueryParams(params);
    });

    this.getListOfMetricGroup.then(async() => {
        if (this.privatemtrsrvc.selectedName && this.privatemtrsrvc.selectedTags) {
          await this.privatemtrsrvc.getMetricsDataPoints().toPromise();
        }
    });
  }

  setQueryParams(params) {
    this.visualize.date = {
      start: !!params.start ? params.start: '24h',
      end: params.end,
      duration: params.start
    };

    this.privatemtrsrvc.start = this.visualize.date.start.toString();
    this.privatemtrsrvc.end = params.end;
    if (!!params[QUERYPARAMS.GROUP]) {
      this.visualize.group = params[QUERYPARAMS.GROUP].split(",");
      if (this.groupPillSet.size === 0) {
        this.groupPillSet.add(params[QUERYPARAMS.GROUP])
        this.defaultGroup = params[QUERYPARAMS.GROUP];
        this.privatemtrsrvc.selectedGroup = { group: this.defaultGroup }
      }
      this.getListOfTags({ group: params[QUERYPARAMS.GROUP] });
    }
    this.getlistOfMetric();

    if (!!params[QUERYPARAMS.METRIC]) {
      this.visualize.metrics = params[QUERYPARAMS.METRIC].split(",");
      if (this.metricPillSet.size === 0) {
        let mtrcArr = this.visualize.metrics;
        this.metricPillSet = new Set(mtrcArr);
        this.defaultMetric = mtrcArr[mtrcArr.length - 1];
        this.privatemtrsrvc.selectedName = { metricName: this.defaultMetric }
      }
      this.getListOfTags({ group: this.visualize.metrics });
    }

    if (!!params[QUERYPARAMS.TAGS]) {
      this.visualize.tags = params[QUERYPARAMS.TAGS].split(",");
      if (this.tagPillSet.size === 0) {
        let tagArr = this.visualize.tags;
        this.tagPillSet = new Set(tagArr);
        this.defaultTags = tagArr[tagArr.length - 1];
        this.privatemtrsrvc.selectedTags = { tag: this.defaultTags }
      }
    }
  }

  ddMetricinit() {
    this.visualize.metrics = ["Select a Metric"];
  }

  ddGroupInit() {
    this.visualize.group = ["Select a Metric Group"];
  }
  ddTagInit() {
    this.visualize.tags = ["Select a Tag"];
  }
  public reset() {
    this.groupPillSet = new Set();
    this.metricPillSet = new Set();
    this.tagPillSet = new Set();
    this.ddMetricinit();
    this.ddTagInit();
  }

  /*=============================== Add params ========================*/
  addMetricInQuery() {
    let queryParams: Params={ metric: undefined };
    if ([...this.metricPillSet].length > 0) {
      queryParams.metric=[...this.metricPillSet].join(',');
    }
    this.privatemtrsrvc.selectedName = queryParams;
    this.changingQueryParams(queryParams, 'merge');
  }

  addTagsInQuery() {
    let queryParams: Params={ tags:undefined };
    if ([...this.tagPillSet].length > 0) {
      queryParams.tags=[...this.tagPillSet].join(',');
    }
    this.privatemtrsrvc.selectedTags = queryParams;
    this.changingQueryParams(queryParams, 'merge');
  }

  addGroupinQuery() {
    let queryParams: Params;
    if ([...this.groupPillSet].length > 0) {
      queryParams = { group: [...this.groupPillSet].join(',') };
    }
    this.changingQueryParams(queryParams, '');
  }
  addTimeRangeinQuery(data){
    this.privatemtrsrvc.start = data.start;
    
    this.privatemtrsrvc.end = data.end;
    
    this.changingQueryParams(data,'merge');
  }

  /*===========================================Service Calls===========================*/

  // Get list of Group
  getListOfMetricGroup = new Promise((resolve, reject) => {
    this.privatemtrsrvc.getMetricGroupList().subscribe((d) => {
      this.visualize.group = this.visualize.group.concat(d);
      resolve(null);
    }, (error) => reject(error));
  });

  // Get list of metric on the basis of Group
  getlistOfMetric() {
    this.privatemtrsrvc.getMetricList().subscribe((d) => {
      this.ddMetricinit();
      this.visualize.metrics = this.visualize.metrics.concat(d);
    });
  }

  // Get list of groups for tenant
  getListOfTags(para: any) {
    this.privatemtrsrvc.getTagsList(para).subscribe((d) => {
      for (const [key, value] of Object.entries(d.tags)) {
        this.visualize.tags.push(`${key}=${value}`);
      }
    });
  }

  /*==============================================================================*/
  /*===============================DropDown change event========================*/

  /**
   * Metric Group Change
   * @param changedGroup
   */
  metricGroupChange(changedGroup) {
    this.reset();
    this.groupPillSet.add(changedGroup)
    this.addGroupinQuery();
  }

  /**
   * Metric Name Change
   * @param metric Name of Metric
   */
  metricChange(changedMetric) {
    this.metricPillSet.add(changedMetric);
    this.addMetricInQuery();
    this.getListOfTags({ metric: changedMetric });
  }

  /**
   * tags Change
   * @param tag Name of tag
   */
  tagChange(tag) {
    this.tagPillSet.add(tag)
    this.addTagsInQuery();
  }
  timeRangeChange(data){
    if(!isNaN(Date.parse(data.start)))
       {
         this.addTimeRangeinQuery(data);
       }else{
         this.addTimeRangeinQuery({start:data.start,end:undefined});
       }
  }
  // =================================================================================
  /** ==========================================Dismissed Event Start=======================================*/

  disMissedGroup(grp) {
    this.reset();
    this.groupPillSet.delete(grp);
    this.addGroupinQuery();

  }
  disMissedMetric(mtr) {
    this.metricPillSet.delete(mtr);
    this.addMetricInQuery();
  }
  disMissedTag(tag) {
    this.tagPillSet.delete(tag);
    this.addTagsInQuery();
  }

  /** ==========================================Dismissed Event End=======================================*/
  /**
   *  add query parameter in route
   * @param data any
   * @param qryPrmHndlr Params
   */
  changingQueryParams(data: Params, qryPrmHndlr: any) {    
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: data,
        queryParamsHandling: qryPrmHndlr, // remove to replace all query params by provided
      }).then(async() => {
        // only start and tag is required param.
        if(this.route.snapshot.queryParams['start'] && this.route.snapshot.queryParams['tags']) 
          await this.privatemtrsrvc.getMetricsDataPoints().toPromise();
      });
  }
}
