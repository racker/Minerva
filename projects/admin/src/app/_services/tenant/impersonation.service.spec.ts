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

    var token = 'AABcX-sOFSVZVN1v2sKUIWbPjpy_DoXSmVn4imLgLYg13T0c_oSSLM7mlV1MrcZU0S6uhzyS8MdYySd5j2xIgT9huFDXcMj-1tyWwNXW8gKGtKyFOowZ_3Zz';


    spyOn(httpService, 'post').and.returnValue(of<ImpersonationToken>({}));
    service.getImpersonationToken(data, token).subscribe(data =>{
      expect(data).toEqual({});
      done();
    });

  });
});
