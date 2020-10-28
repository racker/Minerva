import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { EventsMock } from '../../../../_mocks/events/events.service.mock';
import { EventsService } from '../../../../_services/events/events.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


import { EventslistComponent } from './eventslist.component';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

describe('EventslistComponent', () => {
  let component: EventslistComponent;
  let fixture: ComponentFixture<EventslistComponent>;
  let env: EnvironmentConfig;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ EventslistComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
      ],
      providers:[{provide:EventsService},
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventslistComponent);
    injector= getTestBed();
    component = fixture.componentInstance;
    env = injector.inject(EnvironmentConfig);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set data to events', async()=> {
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.events).toEqual(new EventsMock().eventList.content);
  });

  it('get all events', async(done) =>{
    let spy = spyOn(component, 'getEvents').and.returnValue(of(new EventsMock().single));
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
      expect(component.getEvents).toHaveBeenCalled()
      expect(component.events.length).toBeGreaterThanOrEqual(1);
      done();
  });

  it('should unsubscribe on ngOnDestroy',done =>{
    spyOn(component.subscriber, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriber.unsubscribe).toHaveBeenCalled();
    done();
  });

});
