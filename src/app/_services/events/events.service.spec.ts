import { TestBed, getTestBed } from '@angular/core/testing';
import { EventsService } from './events.service';
import { HttpClientModule } from '@angular/common/http';
import { EventsMock } from "../../_mocks/events/events.service.mock";
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../featureConfig/environmentConfig.service';


describe('EventsService', () => {
  let service: EventsService;
  let injector: TestBed;
  let singlEvnt = new EventsMock();
  let env: EnvironmentConfig;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        EventsService,
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        }
      ],

    });
    injector = getTestBed();
    service = injector.inject(EventsService);
    env= injector.inject(EnvironmentConfig);

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
    service.getEvents(env.pagination.pageSize).subscribe((data) => {
      let mocked = new EventsMock().eventList;
      let slicedArray = new EventsMock().eventList.content
        .slice(0 * env.pagination.pageSize, 1 * env.pagination.pageSize);
      mocked.content = slicedArray
      expect(data).toEqual(mocked);
      done();
    });
  });
});
