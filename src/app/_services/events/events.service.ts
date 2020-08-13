import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EventsMock } from '../../_mocks/events/events.service.mock';
import { Events, Event } from '../../_models/events';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _events: Events;
  private _event:Event;

  private mockedEvents = new EventsMock();

  constructor(private http:HttpClient, private logService:LoggingService) { }

  get events(): Events {
    return this._events;
  }

  set events(value: Events) {
    this._events = value;
  }


    /**
   * Gets a list of events
   * @param size
   * @returns Observable<ListEvents>
   */
  getEvents(size?: number): Observable<Events> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedEvents.eventList);
      //let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.events = mocks;
      //this.events.content = slicedData;
      return of<Events>(this.events);
    } else {
      return this.http.get<Events>(`${environment.api.salus}/event-tasks?size=${size}`, httpOptions)
      .pipe(
        tap(data =>
          { 
            this._events = data;
            this.logService.log(this.events, LogLevels.info);
          }));
      }
  }
}
