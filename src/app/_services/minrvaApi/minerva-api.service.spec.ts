import { TestBed } from '@angular/core/testing';

import { MinervaApiService } from './minerva-api.service';

describe('MinervaApiService', () => {
  let service: MinervaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinervaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
