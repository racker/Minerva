import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { eventsMock } from '../../_mocks/events/events.service.mock';
import { ListEvents, Event } from '../../_models/events';
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
  private _events: ListEvents;
  private _event:Event;

  private mockedEvents = new eventsMock();

  constructor(private http:HttpClient, private logService:LoggingService) { }

  get events(): ListEvents {
    return this._events;
  }

  set events(value: ListEvents) {
    this._events = value;
  }


    /**
   * Gets a list of events
   * @param size
   * @returns Observable<ListEvents>
   */
  getEvents(size?: number): Observable<ListEvents> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedEvents.eventList);
      //let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.events = mocks;
      //this.events.content = slicedData;
      return of<ListEvents>(this.events);
    } else {
      return this.http.get<ListEvents>(`${environment.api.salus}/event-tasks?size=${size}`, httpOptions)
      .pipe(
        tap(data =>
          { this._events = data;
            this.logService.log(this.events, LogLevels.info);
          }));
      }
  }

    /**
   * Gets a single Event
   * @param id
   * @returns Observable<Event>
   */
  getResource(id: string): Observable<Event> {
    if (environment.mock) {
      this._event = this.mockedEvents.single;
      return of<Event>(this.mockedEvents.single);
    }
    else {
      return this.http.get<Event>(`${environment.api.salus}/resources/${id}`)
      .pipe(
        tap(data =>
          {
            this._event = data;
            this.logService.log(`Resource: ${data}`, LogLevels.info);
          })
      );
    }
  }




}
