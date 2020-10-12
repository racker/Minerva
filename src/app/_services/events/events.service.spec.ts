import { TestBed, getTestBed } from '@angular/core/testing';
import { EventsService } from './events.service';
import { HttpClientModule } from '@angular/common/http';
import { EventsMock } from "../../_mocks/events/events.service.mock";
import { environment } from '../../../environments/environment';


describe('EventsService', () => {
  let service: EventsService;
  let injector: TestBed;
  let singlEvnt = new EventsMock();


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        EventsService
      ],

    });
    injector = getTestBed();
    service = injector.get(EventsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return sigle event', (done) => {
    service.getEventById('').subscribe((data) => {
      expect(data.name).toBe(singlEvnt.single.name);
      done();
    })
  });



  it('should return all events', (done) => {
    service.getEvents(environment.pagination.pageSize).subscribe((data) => {
      let mocked = new EventsMock().eventList;
      let slicedArray = new EventsMock().eventList.content
        .slice(0 * environment.pagination.pageSize, 1 * environment.pagination.pageSize);
      mocked.content = slicedArray
      expect(data).toEqual(mocked);
      done();
    });
  });
});
