import { Injectable } from '@angular/core';
import { EnvironmentConfig } from "../config/environmentConfig.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { LoggingService } from '../logging/logging.service';
import { tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

/**
 * Service that connect with Minerva api
*/
@Injectable({
  providedIn: 'root'
})
export class MinervaApiService {

  constructor( 
    private env: EnvironmentConfig, 
    private http: HttpClient, 
    private logService: LoggingService,) { }

  getDemo(){
    return this.http.get(`${this.env.api.minerva}/demo`,httpOptions).pipe(
      tap(data =>{
        this.logService.log(`Minerva Api: ${data}`, LogLevels.info);
      })
    );
  }
}
