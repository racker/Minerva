import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { EventsMock } from '../../../../_mocks/events/events.service.mock';
import { EventsService } from '../../../../_services/events/events.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


import { EventslistComponent } from './eventslist.component';

describe('EventslistComponent', () => {
  let component: EventslistComponent;
  let fixture: ComponentFixture<EventslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ EventslistComponent ],
      imports:[
        HttpClientModule,
        RouterTestingModule,
      ],
      providers:[{provide:EventsService}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /*it('should set data to events', ()=> {
    expect(component.events).toEqual(new EventsMock().eventList.content);
  });*/

  it('get all events', (done) =>{
    let spy = spyOn(component, 'getEvents').and.returnValue(of(new EventsMock().single));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(component.getEvents).toHaveBeenCalled()
      expect(component.events.length).toBeGreaterThanOrEqual(1);
      done();
    })
  });

  it('should unsubscribe on ngOnDestroy',done =>{
    spyOn(component.subscriber, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriber.unsubscribe).toHaveBeenCalled();
    done();
  });

});
