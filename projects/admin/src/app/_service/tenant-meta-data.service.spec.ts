import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { TenantMetaData } from '../_model/tenantMetaData';
import { TenantMock } from '../_mocks/tenants/tenants.service.mock';
import { TenantMetaDataService } from './tenant-meta-data.service';

describe('TenantMetaDataService', () => {
  let service: TenantMetaDataService;
  let envService: EnvironmentConfig;
  let httpService: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(TenantMetaDataService);
    envService = TestBed.inject(EnvironmentConfig);
    httpService = TestBed.inject(HttpClient);
    envService.loadEnvironment();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a tenant', (done) => {
    let tenantMetaData = new TenantMock();
    let spy = spyOn(httpService, 'post').and.returnValue(of<TenantMetaData>(
      tenantMetaData.tenantMetadata
    ));
    service.createTenantMetaData(tenantMetaData.tenantMetadata);
    expect(spy).toHaveBeenCalled();
    done();
  });
});
