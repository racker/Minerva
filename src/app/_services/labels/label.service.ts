import { Injectable } from '@angular/core';
import { LoggingService } from '../logging/logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogLevels } from 'src/app/_enums/log-levels.enum'
import { LabelResources, LabelMonitors } from '../../_models/labels';
import { LabelMock } from '../../_mocks/labels/label.service.mock';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';import { PortalDataService } from '../portal/portal-data.service';
import { EnvironmentConfig } from '../featureConfig/environmentConfig.service';
;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private _labels;

  get labels() {
    return this._labels;
  }

  set labels(value: any) {
    this._labels = value;
  }

  private mockedLabels = new LabelMock();
  constructor(private http:HttpClient,
     private portalService: PortalDataService,
    private logService: LoggingService, private env : EnvironmentConfig) { }

  /**
   * @description Get all labels attached to all Resources
   * @returns Observable {}
   */
  getResourceLabels(): Observable<LabelResources> {
    if (this.env.mock) {
      this._labels = this.mockedLabels.resourceLabels;
      return of<LabelResources>(this.mockedLabels.resourceLabels);
    }
    else {
      return this.http.get<LabelResources>(`${this.env.api.salus}/${this.portalService.portalData.domainId}
      /resource-labels`, httpOptions)
      .pipe(
        tap(data => {
          this._labels = data;
          this.logService.log(this.labels, LogLevels.info);
        })
      )
    }
  }

/**
 * @description Get all labels attached to all monitors
 * @returns Observable {}
 */
  getMonitorLabels(): Observable<LabelMonitors> {
    if (this.env.mock) {
      this._labels = this.mockedLabels.monitorLabels;
      return of<LabelMonitors>(this.mockedLabels.monitorLabels);
    }
    else {
      return this.http.get<LabelMonitors>(`${this.env.api.salus}/${this.portalService.portalData.domainId}
      /resource-labels`, httpOptions)
      .pipe(
        tap(data => {
          this._labels = data;
          this.logService.log(data, LogLevels.info)
        })
      )
    }
  }
}
