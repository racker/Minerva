import { Injectable } from '@angular/core';
import { IPortalData } from '../../_models/portalData';
import { EnvironmentConfig } from "../../_services/config/environmentConfig.service";

@Injectable({
  providedIn: 'root'
})
export class PortalDataService {

  portalData: IPortalData;
  constructor(private env : EnvironmentConfig) {
    let portal = window['PORTAL_DATA'];
    this.portalData = {
      isRacker: portal?.isRacker || null,
      domainId: this.env.isAdmin ? '7799042' :  portal?.domainId || null,
      userId: portal?.userId || null,
      username: portal?.username || null,
      tenants:  this.env.isAdmin ? ['cloud:7799042'] : portal?.tenants || null
    }

  }
}
