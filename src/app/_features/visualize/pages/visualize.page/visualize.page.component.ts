import { Component } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TimeRange } from '@minerva/_models/timerange';

interface Visualize {
  metricName?: string
  groupQuery: string[];

  metricQuery?: string[]; //query
  tags?: string[];
  date: TimeRange
}


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

  public metrics = [];
  public metricGrp = [];
  public tags = new Set();
  public groupPillSet = new Set();
  public metricPillSet = new Set();
  public tagPillSet = new Set();
  public defaultMetric: string;
  public defaultGroup: string;
  public defaultTags: string;
  visualize: Visualize = {
    date: {},
    groupQuery: []
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
    this.getListOfMetricGroup();
  }

  setQueryParams(params) {
    this.visualize.date = {
      start: params.start,
      end: params.end,
      duration: params.duration
    };
 
    if (!!params[QUERYPARAMS.GROUP]) {
      this.visualize.groupQuery = params[QUERYPARAMS.GROUP].split(",");
      if (this.groupPillSet.size === 0) {
        this.groupPillSet.add(params[QUERYPARAMS.GROUP])
        this.defaultGroup = params[QUERYPARAMS.GROUP];
      }
      this.getlistOfMetric(params[QUERYPARAMS.GROUP]);
      this.getListOfTags({ group: params[QUERYPARAMS.GROUP] });
    }
    
    if (!!params[QUERYPARAMS.METRIC]) {
      this.visualize.metricQuery = params[QUERYPARAMS.METRIC].split(",");
      if (this.metricPillSet.size === 0) {
        let mtrcArr = params[QUERYPARAMS.METRIC].split(",");
        this.metricPillSet = new Set(mtrcArr);
        this.defaultMetric = mtrcArr[mtrcArr.length - 1];
      }
     
      this.getListOfTags({ group: params[QUERYPARAMS.METRIC].split(",") });
    }

    if (!!params[QUERYPARAMS.TAGS]) {
      this.visualize.tags = params[QUERYPARAMS.TAGS].split(",");
      if (this.tagPillSet.size === 0) {
        let tagArr = params[QUERYPARAMS.TAGS].split(",");
        this.tagPillSet = new Set(tagArr);
        this.defaultTags = tagArr[tagArr.length - 1];
      }
    }
  }

  ddMetricinit() {
    this.metrics = ["Select a Metric"];

  }
  ddGroupInit() {
    this.metricGrp = ["Select a Metric Group"];
  }
  ddTagInit() {
    this.tags = new Set();
    this.tags.add("Select a Tag");
  }


  public reset() {
    this.groupPillSet = new Set();
    this.metricPillSet = new Set();
    this.tagPillSet = new Set();
    this.ddMetricinit();
    this.ddTagInit();
  }



  addMetricInQuery() {
    let queryParams: Params={ metric: undefined };
    if ([...this.metricPillSet].length > 0) {
      queryParams.metric=[...this.metricPillSet].join(',');
    }
    this.changingQueryParams(queryParams, 'merge');
  }

  addTagsInQuery() {
    let queryParams: Params={ tags:undefined };
    if ([...this.tagPillSet].length > 0) {
      queryParams.tags=[...this.tagPillSet].join(',');
    } 
     this.changingQueryParams(queryParams, 'merge');
  }

  addGroupinQuery() {
    let queryParams: Params;
    if ([...this.groupPillSet].length > 0) {
      queryParams = { group: [...this.groupPillSet].join(',') };
    }
    this.changingQueryParams(queryParams, '');
  }


  /*===========================================Service Calls===========================*/

  // Get list of Group
  getListOfMetricGroup() {
    this.privatemtrsrvc.getMetricGroupList().subscribe((d) => {
      this.metricGrp = this.metricGrp.concat(d);
    });
  }

  // Get list of metric on the basis of Group
  getlistOfMetric(group) {
    this.privatemtrsrvc.getMetricList(group).subscribe((d) => {
      this.ddMetricinit();
      this.metrics = this.metrics.concat(d);
    })
  }

  getListOfTags(para: any) {
    this.privatemtrsrvc.getTagsList(para).subscribe((d) => {
      d.forEach((it) => {
        Object.entries(Object.assign({}, ...it)).forEach(a => {
          this.tags = this.tags.add(a.join("="))
        });
      });
    })
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
    //this.getlistOfMetric(changedGroup);
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
}
