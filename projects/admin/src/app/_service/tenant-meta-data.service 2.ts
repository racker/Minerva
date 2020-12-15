import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { TenantMetadata } from '../_model/tenantMetadata';


const httpOption= {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TenantMetaDataService {
  constructor(private http: HttpClient, private env: EnvironmentConfig) {}

  /**
   * Request to the admin create tenant metadata API 
   */
  createTenantMetaData(metadata: TenantMetadata) {
    return this.http.post(`${this.env.api.minerva}/tenant-metadata`, metadata);
  }
}
