import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { environment } from '../../../../../../env/admin/environment';
import { ErrorService } from 'src/app/_services/error.service';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { ImpersonationToken, impUser } from '../../_model/impersonationModel';



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
    private errorService: ErrorService) { }

  getImpersonationToken(data:impUser, token) { // TODO: We need rax-token to be dynamic once we are done with SSO working!
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'rax-token':token 
      })
    }
    return this.http.post(`${environment.api.minerva}/impersonationtoken`,data,httpOptions);
  }
}
