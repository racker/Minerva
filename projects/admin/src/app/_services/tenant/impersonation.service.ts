import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from 'src/app/_services/error.service';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { ImpersonationToken, impUser } from '../../_model/impersonationModel';
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';



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
    private errorService: ErrorService, private env: EnvironmentConfig) { }

  getImpersonationToken(data:impUser, token) { // TODO: We need rax-token to be dynamic once we are done with SSO working!
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rax-token':token 
      })
    }
    return this.http.post(`${this.env.api.minerva}/impersonationtoken`,data,httpOptions);
  }
}
