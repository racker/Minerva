import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { Monitors, Monitor, TestMonitor } from 'src/app/_models/monitors';
import { CreateMonitor } from 'src/app/_models/salus.monitor';
import { BoundMonitorPaging } from 'src/app/_models/resources';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { CreateTestMonitor } from 'src/app/_features/monitors/interfaces/testMonitor.interface';
import { PortalDataService } from '../portal/portal-data.service';
import { EnvironmentConfig } from '../config/environmentConfig.service';
import { ErrorService } from "../error.service"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private _monitors: Monitors;
  private _monitor: Monitor;
  private mockedMonitors = new monitorsMock();
  private _boundMonitor: BoundMonitorPaging;

  constructor(private http:HttpClient,
     private portalService: PortalDataService,
    private logService: LoggingService,
    private env: EnvironmentConfig,
    private errorService: ErrorService) { }

  get monitors(): Monitors {
    return this._monitors;
  }

  set monitors(value: Monitors) {
    this._monitors = value;
  }

  get monitor(): Monitor {
    return this._monitor
  }

  set monitor(value: Monitor) {
    this._monitor = value;
  }

  get boundMonitor(): BoundMonitorPaging {
    return this._boundMonitor;
  }

  set boundMonitor(value: BoundMonitorPaging) {
    this._boundMonitor = value;
  }

  /**
   * @description Gets a list of monitors
   * @param size number
   * @param page number
   * @param sorting string
   * @returns Observable<Monitors>
   */
  getMonitors(size: number, page: number, sorting?:string): Observable<Monitors> {
    if (this.env.mock) {
      let mocks = Object.assign({}, this.mockedMonitors.collection);
      if(sorting)
      this.mockedMonitors.collection.content.reverse();
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.monitors = mocks;
      this.monitors.content = slicedData;
      return of<Monitors>(this.monitors).pipe(delay(500));
    }
    else {
      return this.http.get<Monitors>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors`,
       { headers:httpOptions.headers,
        params: {
          size: `${size}`,
          page: `${page}`,
          sort:sorting
        }
      })
        .pipe(
          tap(data => {
            this.monitors = data;
            this.logService.log(this.monitors, LogLevels.info);
          }),
          catchError(this.errorService.transformSalusErrorHandler)
          );
    }
}

/**
 * @description Gets a single monitor
 * @param id string
 * @returns Observable<Monitor>
 */
  getMonitor(id: string): Observable<Monitor> {
      return this.http.get<Monitor>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors/${id}`, httpOptions)
      .pipe(
        tap(data => {
          this._monitor = data;
          this.logService.log(`Monitor: ${data}`, LogLevels.info);
        }),
        catchError(this.errorService.transformSalusErrorHandler)
        );
  }

  /**
   * Create a new monitor
   * @param monitor formatted monitor to be created
   * @returns Observable<Monitor>
   */
  createMonitor(monitor:CreateMonitor): Observable<Monitor> {
          return this.http.post<Monitor>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors`, monitor, httpOptions)
          .pipe(
            tap(data => {
              this.logService.log(`Monitor created: ${data.id}`, LogLevels.info);
              return of<Monitor>(data);
            }),
            catchError(this.errorService.transformSalusErrorHandler)
            );
  }



  /**
   * Update a monitor using patch method
   * @param id string
   * @param details any[]
   * @returns Observable<Monitor>
   */
  updateMonitor(id: string, details: {[key: string]: any}): Observable<Monitor> {
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json-patch+json');
      return this.http.patch<Monitor>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors/${id}`, details, httpOptions)
      .pipe(
        tap((data: Monitor) => {
          this._monitor = data;
          this.logService.log(`Monitor: ${data}`, LogLevels.info)
        }),
        catchError(this.errorService.transformSalusErrorHandler)
        );
  }

  /**
   * @description Deletes a monitor
   * @param id string
   */
  deleteMonitor(id:string): Observable<any> {
      return this.http.delete(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors/${id}`, {observe: 'response'})
      .pipe(
        tap(data => {
          this.logService.log(`Monitor deleted: ${id}`, LogLevels.info);
        }));
        // TODO: Add SalusErrorHandler once accounted for components subscribed to this function
  }

    /**
   * @description called function to delete multiple monitors using promise.
   * @param id
   */
  deleteMonitorPromise(id:string): Promise<any> {
    return this.http
      .delete(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors/${id}`)
      .toPromise()
      .then(
        (res: Response) => Promise.resolve(res)
      )
      .catch(
        (err) =>{
          this.errorService.transformSalusErrorHandler(err);
          Promise.reject(err);
        }
      );
  }


/**
 * @description Get monitors list associated with a resource.
 * @param resourceId string
 * @param monitorId string
 */
  getBoundMonitor(ids:any):Observable<BoundMonitorPaging>{
    // TODO: Add paging mechanism to this service
        let queryParam = Object.keys(ids).map((key) => key + "=" + ids[key]).join('&');
        return this.http.get<BoundMonitorPaging>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/bound-monitors?${queryParam}`, httpOptions)
        .pipe(
          tap(data => {
            this._boundMonitor = data;
            this.logService.log(`Bound Monitor: ${data}`, LogLevels.info);
          }),
          catchError(this.errorService.transformSalusErrorHandler)
          );
  }

  searchMonitors(search:string): Observable<Monitors> {
      return this.http.get<Monitors>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/monitors-search/`, {
        params: {
          q: search
        }
      }).pipe(
        catchError(this.errorService.transformSalusErrorHandler)
        );
  }

  monitorTest(monitorData: CreateTestMonitor): Observable<TestMonitor> {
    let data = monitorData;
      return this.http.post<TestMonitor>(`${this.env.api.salus}/${this.portalService.portalData.domainId}/test-monitor`, data, httpOptions)
        .pipe(
          tap(data => {
            this.logService.log(`Test Monitor Results: ${data}`, LogLevels.info);
          }),
          catchError(this.errorService.transformSalusErrorHandler)
          );
        }
}
