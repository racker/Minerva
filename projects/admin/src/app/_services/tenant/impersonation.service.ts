import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { ErrorService } from 'src/app/_services/error.service';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { ImpersonationToken, impUser,  } from '../_model/impersonationModel';


@Injectable({
  providedIn: 'root'
})
export class ImpersonationService {
  private _access: ImpersonationToken;
  
  public get access() : ImpersonationToken {
    return this._access;
  }
  
  public set access(v : ImpersonationToken) {
    this._access = v;
  }
  
  

  constructor(private http: HttpClient, 
    private logService: LoggingService,
    private errorService: ErrorService, 
    private env: EnvironmentConfig) { }

  getImpersonationToken(data:impUser):Observable<ImpersonationToken> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rackertoken':''
      })
    }
    return this.http.post<ImpersonationToken>(`${this.env.api.minerva}/impersonationtoken`,data,httpOptions);
  }
}
