import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { TenantmetaData, TenantmetaDataList } from '../_model/tenantMetaData';
import { Observable } from 'rxjs';


const httpOption= {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TenantmetaDataService {
  constructor(private http: HttpClient, private env: EnvironmentConfig) {}

  /**
   * Request to the admin create tenant metadata API
   */
  createTenantMetaData(metadata: TenantmetaData) {
    return this.http.post(`${this.env.api.salus}/tenant-metadata`, metadata);
  }

  /**
   * Request to get list of tenant metaData
   */
  getTenantmetaData(): Observable<TenantmetaDataList> {
    return this.http.get<TenantmetaDataList>(`${this.env.api.salus}/tenant-metadata`);
  }
}
