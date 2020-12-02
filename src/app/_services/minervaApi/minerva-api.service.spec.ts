import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MinervaApiService } from './minerva-api.service';

describe('MinervaApiService', () => {
  let service: MinervaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(MinervaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
