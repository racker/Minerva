import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import { HttpClientModule } from '@angular/common/http';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(EventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
