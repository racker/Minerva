import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TenantMetaDataService } from './tenant-meta-data.service';

describe('TenantMetaDataService', () => {
  let service: TenantMetaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(TenantMetaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
