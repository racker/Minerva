import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsService);
  });

 xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
