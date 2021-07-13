import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PortalDataService } from '../portal/portal-data.service';
import { LoggingService } from '../../_services/logging/logging.service';
import { EnvironmentConfig } from '../config/environmentConfig.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from '../error.service';
import { LogLevels } from '@minerva/_enums/log-levels.enum';
import { QueryMetricResponse } from '@minerva/_models/metrics';
import { Tags } from '@minerva/_models/metrics';
import { Params } from '@angular/router';
import moment from "moment";
import { presetDates } from '@minerva/_features/visualize/components/timerange/timerange.component';
@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private metricGroup = new BehaviorSubject<[string] | null>(null);
  private metricNames = new BehaviorSubject<any | null>(null);
  private metrics = new BehaviorSubject<QueryMetricResponse[]>(null);
  private _selectedName: Params;
  private _selectedGroup: Params;
  private _selectedTags: Params;
  private _start: string;
  private _end: string;
  GetmtrcGrp$(): Observable<any> {
    return this.metricGroup.asObservable();
  }

  SetmtrcGrp(mtrcGrp: any) {
    this.metricGroup.next(mtrcGrp);
  }

  GetMtrcNms$(){
    return this.metricNames.asObservable();
  }
  SetMtrcNms(mtrcName:any){
    this.metricNames.next(mtrcName);
  }

  getMetrics$() {
    return this.metrics.asObservable();
  }

  setMetrics(data: QueryMetricResponse[]) {
    this.metrics.next(data);
  }

  get selectedName() {
    return this._selectedName;
  }

  set selectedName(names) {
    this._selectedName = names;
  }

  get selectedGroup() {
    return this._selectedGroup;
  }

  set selectedGroup(group) {
    this._selectedGroup = group;
  }

  get selectedTags() {
    return this._selectedTags;
  }

  set selectedTags(tags) {
    this._selectedTags = tags;
  }

  get start() {
    return this._start;
  }

  set start(date:string) {
    this._start = date;
  }

  get end() {
    return this._end;
  }

  set end(date:string) {
    this._end = date;
  }

  /**
   * Compose header needed for metrics requests
   * @returns {headers: HttpHeaders}
   */
  private xTenantHeader = (): {headers: HttpHeaders} => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Tenant': this.portalDataService.portalData.domainId // set this static to test metricnames, tags and query api with different params
      })
    };
  };

  /**
   *
   * @param start string
   * @returns  {[x:string]: any}
   */
  private granularity = (start:string): {[x:string]: any} => {
    let granularity;
    let aggregator;
    let end;

    // if start is in preset array & under 2 days return with no extra params
    let duration = presetDates.find(({ value }) => value === start)?.value;
    if (duration === presetDates[0].value ||duration === presetDates[1].value ||
      duration === presetDates[2].value ) {
        return {
          start
        };
    }

    // if start is in preset array & over 2 days set pertaining params
    if (duration === presetDates[3].value || duration === presetDates[4].value) {
      granularity = 'pt1h';
      aggregator = 'avg';
    }

    let startDate = moment(start);
    let endDate = moment(this.end);

    // if startDate & endDate is valid & more than 2 days set param values with end date
    if (startDate.isValid() && endDate.isValid()) {
      let difference = moment.duration(endDate.diff(startDate));
      let addGranularity = difference.asDays() >= 2;

      granularity = addGranularity ? 'pt1h' : null;
      aggregator = addGranularity ? 'avg' : null;
      end = endDate.toISOString();
    }

    return {
      start,
      end,
      granularity,
      aggregator
    }
  }


  /**
   * Compose query params for metrics requests
   * @returns {[x:string]: any}
   */
  private queryParams = (): {[x:string]: any} => {
    let { start, end, granularity, aggregator} = this.granularity(this.start);

    return {
      start,
      ...(granularity && { granularity }),
      ...(aggregator && { aggregator }),
      ...(end && { end }),
      ...(!!this.selectedTags && { tag: this.selectedTags.tags }),
      ...(!!this.selectedName && { metricName: this.selectedName.metric }),
      ...(!!this.selectedGroup && { metricGroup: this.selectedGroup })
    }
  }

  private readonly metricsURL: string;
  constructor(private http: HttpClient,
    private logService: LoggingService,
    private errorService: ErrorService,
    private portalDataService: PortalDataService,

    private env: EnvironmentConfig) {
    this.metricsURL = this.env.api.metrics;
  }

  /**
   * Get list of Metric names
   * @param groupName string
    * @returns Observable array of available measurements
  */
  getMetricList() {
    return this.http.get<[string]>(`${this.env.api.metrics}/metadata/metricNames`,{ ...this.xTenantHeader()
    })
    .pipe(
      tap((data:any) => {
        this.SetMtrcNms(data);
        this.logService.log(`Metric List: ${data}`, LogLevels.info);
      }),
      catchError(this.errorService.transformSalusErrorHandler)
      );
  }


  /**
   * Get list of Metric groups
   * @returns Observable<[string]>
   */
  getMetricGroupList(): Observable<[string]> {
    return this.http.get<[string]>(`${this.env.api.metrics}/metadata/metricGroup`, this.xTenantHeader())
    .pipe(
      tap((data:any) => {
        this.SetmtrcGrp(data);
        this.logService.log(`Metric group List: ${data}`, LogLevels.info);
      }),
      catchError(this.errorService.transformSalusErrorHandler)
      );
  }

  /**
   * Get list of tags based on query params
   * @param data Params
   * @returns Observable<[string]>
   */
  getTagsList(data:Params): Observable<any> {
    return this.http.get<Tags>(`${this.env.api.metrics}/metadata/tags`, { ...this.xTenantHeader(),
      params:data
    })
    .pipe(
      tap((data:any) => {
        //this.SetMtrcNms(data);
        this.logService.log(`Tags List: ${data}`, LogLevels.info);
      }),
      catchError(this.errorService.transformSalusErrorHandler)
      );
  }

  /**
   * Get metric data points
   * @returns Observable<QueryMetricResponse>
   */
  getMetricsDataPoints(): Observable<QueryMetricResponse[]> {
    return this.http.get<QueryMetricResponse[]>(`${this.env.api.metrics}/query`, {...this.xTenantHeader(),
      params: this.queryParams()
    }).pipe(
      tap((data:QueryMetricResponse[]) => {
        this.setMetrics(data)
      })
    )
  }
}