import { TestBed, getTestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EventsMock } from "../../_mocks/events/events.service.mock";

describe('EventsService', () => {
  let service: EventsService;
  let injector : TestBed;
  let singlEvnt= new EventsMock();
    

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers:[
        EventsService
      ],
      
    });
    injector=getTestBed();
    service = injector.get(EventsService);

  });

 it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return sigle event', (done) => {
    service.getEventById('').subscribe((data) =>{
      expect(data.name).toBe(singlEvnt.single.name);
      done();
    })
    
  });
});
