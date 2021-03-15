import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { ImpersonationToken } from '../../_model/impersonationModel';

import { ImpersonationService } from './impersonation.service';

describe('ImpersonationService', () => {
  let service: ImpersonationService;
  let envService: EnvironmentConfig;
  let httpService: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(ImpersonationService);
    envService = TestBed.inject(EnvironmentConfig);
    httpService = TestBed.inject(HttpClient);
    envService.loadEnvironment();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('get Impersonation Token', (done) => {
    let data={
      "RAX-AUTH:impersonation": {
        "user": {
          "username": "walterwhite"
        }
      }
    }
    spyOn(httpService, 'post').and.returnValue(of<ImpersonationToken>({}));
    service.getImpersonationToken(data).subscribe(data =>{
      expect(data).toEqual({});
      done();
    });
    
  });
});
