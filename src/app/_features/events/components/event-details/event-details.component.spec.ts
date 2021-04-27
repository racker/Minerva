import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import { EventsService } from 'src/app/_services/events/events.service';
import { SharedModule } from 'src/app/_shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {  EventsMock} from "@minerva/_mocks/events/events.service.mock";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

describe('EventDetailsComponent', () => {
  let injector: TestBed;
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;
  let eventMock=new EventsMock();
  let env: EnvironmentConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ],
      providers:[EventsService,
        {
          provide: ActivatedRoute,

          useValue: {
            params: of({id: "345d678ddopdkdjd67isdjj"}),
          }
        },
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        }
      ],
      imports:[SharedModule, HttpClientTestingModule]
    })
    .compileComponents();
    injector = getTestBed();
    env= injector.inject(EnvironmentConfig);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add single subscription', () => {
    let spy = spyOn(component.subsriptions, 'add');
    component.ngOnInit()
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should get single event', (done) => {
    component.getEvent('');
    component.$evnt.subscribe(data =>{
      expect(data).toEqual(eventMock.single)
      done();
    })
  });
  it(`should set event id from route`,async(done) =>{
    await component.getParams();
    expect('345d678ddopdkdjd67isdjj').toBe(component.eventId);
    done();
  });

  it('should assign state class name', () => {
    expect(component.assignClassName('CRITICAL')).toEqual('state-critical');
    expect(component.assignClassName('INFO')).toEqual('state-info');
    expect(component.assignClassName('OK')).toEqual('state-ok');
    expect(component.assignClassName('WARNING')).toEqual('state-warning');
  });

  it('Should destory all subscription',(done) =>{
    spyOn(component.subsriptions, 'unsubscribe')
    component.ngOnDestroy();
    expect(component.subsriptions.unsubscribe).toHaveBeenCalled();
    done();
  });
});
