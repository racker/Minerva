import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EventsMock } from '../../_mocks/events/events.service.mock';
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


  it('should return all events', () => {
    service.getEvents(environment.pagination.pageSize).subscribe((data) => {
      let mocked = new EventsMock().eventList;
      let slicedArray = new EventsMock().eventList.content
       .slice(0 * environment.pagination.pageSize, 1 * environment.pagination.pageSize);
      mocked.content = slicedArray
      expect(data).toEqual(mocked);
    });
  });
});
