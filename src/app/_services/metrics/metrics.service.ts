import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PortalDataService } from '../portal/portal-data.service';
import { LoggingService } from '../../_services/logging/logging.service';
import { EnvironmentConfig } from '../config/environmentConfig.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from '../error.service';
import { LogLevels } from '@minerva/_enums/log-levels.enum';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private metricGroup = new BehaviorSubject<[string] | null>(null);
  private metricNames = new BehaviorSubject<[string] | null>(null);


  GetmtrcGrp(): Observable<[string]> {
    return this.metricGroup.asObservable();
  }

  SetmtrcGrp(mtrcGrp: [string]) {
    this.metricGroup.next(mtrcGrp);
  }

  GetMtrcNms(){
    return this.metricNames.asObservable();
  }
  SetMtrcNms(mtrcName:[string]){
    this.metricNames.next(mtrcName);
  }

  private readonly metricsURL: string;
  constructor(private http: HttpClient,
    private logService: LoggingService,
    private portalDataService: PortalDataService,
    private errorService: ErrorService,
    private env: EnvironmentConfig) {
    this.metricsURL = this.env.api.metrics;
  }

  /**
    * @returns Observable array of available measurements
  */
  getMetricList(groupName:string) {
    httpOptions.headers['X-Tenant']=this.portalDataService.portalData.domainId;
    return this.http.get<[string]>(`${this.metricsURL}/metadata/metricNames`,{ headers:httpOptions.headers,
      params: {
        group:groupName
      }
    }
    )
    .pipe(
      tap((data:any) => {
        this.SetMtrcNms(data);
        this.logService.log(`Metric List: ${data}`, LogLevels.info);
      }),
      catchError(this.errorService.transformSalusErrorHandler)
      );
  }


  getMetricGroupList() {
    httpOptions.headers['X-Tenant']=this.portalDataService.portalData.domainId;
   
    return this.http.get<[string]>(`${this.metricsURL}/metadata/metricGroup`, httpOptions)
    .pipe(
      tap((data:any) => {
        this.SetmtrcGrp(data);
        this.logService.log(`Metric group List: ${data}`, LogLevels.info);
      }),
      catchError(this.errorService.transformSalusErrorHandler)
      );
  }

  getTagsList(data:any){
    httpOptions.headers['X-Tenant']=this.portalDataService.portalData.domainId;
    return this.http.get<[string]>(`${this.metricsURL}/metadata/tags`,{ headers:httpOptions.headers,
      params:data
    }
    )
    .pipe(
      tap((data:any) => {
        this.SetMtrcNms(data);
        this.logService.log(`Tags List: ${data}`, LogLevels.info);
      }),
      catchError(this.errorService.transformSalusErrorHandler)
      );
  }


}
