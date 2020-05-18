import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock'
import { Monitors, Monitor, Schema } from 'src/app/_models/monitors';
import { CreateMonitor } from 'src/app/_models/salus.monitor';
import { BoundMonitorPaging } from 'src/app/_models/resources';

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

  private _schema: Schema;
  private mockedMonitors = new monitorsMock();
  private _boundMonitor: BoundMonitorPaging;

  constructor(private http:HttpClient, private logService: LoggingService) { }

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
   * @returns Observable<Monitors>
   */
  getMonitors(size: number, page: number): Observable<Monitors> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedMonitors.collection);
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.monitors = mocks;
      this.monitors.content = slicedData
      return of<Monitors>(this.monitors);
    }
    else {
    return this.http.get<Monitors>(`${environment.api.salus}/monitors?size=${size}&page=${page}`, httpOptions)
    .pipe(
      tap(data =>
        { this.monitors = data;
          this.logService.log(this.monitors, LogLevels.info);
        }));
    }
  }

/**
 * @description Gets a single monitor
 * @param id string
 * @returns Observable<Monitor>
 */
  getMonitor(id: string): Observable<Monitor> {
    if (environment.mock) {
      this._monitor = this.mockedMonitors.single;
      return of<Monitor>(this.mockedMonitors.single);
    }
    else {
      return this.http.get<Monitor>(`${environment.api.salus}/monitors/${id}`, httpOptions)
      .pipe(
        tap(data => {
          this._monitor = data;
          this.logService.log(`Monitor: ${data}`, LogLevels.info);
        })
      );
    }
  }

  /**
   * @description Create a new monitor
   * @param monitor formatted monitor to be created
   * @returns Observable<Monitor>
   *
   */
  createMonitor(monitor:CreateMonitor): Observable<Monitor> {
        if (environment.mock) {
          this._monitor = this.mockedMonitors.single;
          return of<Monitor>(this.mockedMonitors.single);
        }
        else {
          return this.http.post<Monitor>(`${environment.api.salus}/monitors`, monitor, httpOptions)
          .pipe(
            tap(data => {
              return of<Monitor>(data);
              this.logService.log(`Monitor created: ${data.id}`, LogLevels.info);
            })
          );
        }
  }


  updateMonitor(id:number): Observable<any> {
    return of();
  }

  /**
   * @description Deletes a monitor
   * @param id string
   */
  deleteMonitor(id:string): Observable<any> {
    if (environment.mock) {
      return of<boolean>(true);
    }
    else {
      return this.http.delete(`${environment.api.salus}/monitors/${id}`, {observe: 'response'})
      .pipe(
        tap(data => {
          this.logService.log(`Monitor deleted: ${id}`, LogLevels.info);
        })
      );
    }
  }
/**
 * @description Get monitors list associated with a resource.
 * @param resourceId string
 */
  getBoundMonitor(resourceId:string):Observable<BoundMonitorPaging>{
    if (environment.mock) {
      this._boundMonitor=this.mockedMonitors.boundMonitor;
      return of<BoundMonitorPaging>(this._boundMonitor);
      }else {
        return this.http.get<BoundMonitorPaging>(`${environment.api.salus}/monitors/bound-monitors?resourceId=${resourceId}`, httpOptions)
        .pipe(
          tap(data => {
            this._boundMonitor = data;
            this.logService.log(`Bound Monitor: ${data}`, LogLevels.info);
          })
        );
      }

  }
}
