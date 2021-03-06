import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Event, Events } from "../../_models/events";
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LoggingService } from '../logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { EventsMock } from "../../_mocks/events/events.service.mock";
import { PortalDataService } from '../portal/portal-data.service';
import { EnvironmentConfig } from '../config/environmentConfig.service';

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
  private event;
  private mockedEvents = new EventsMock();

  constructor(private http: HttpClient, 
    private portalService: PortalDataService,
    private logService: LoggingService, private env: EnvironmentConfig) { }

  get events(): Events {
    return this._events;
  }

  set events(value: Events) {
    this._events = value;
  }

  public get getEvent() {
    return this.event
  }

  public set setEvent(v: any) {
    this.event = v;
  }

  /**
 * Gets a list of events
 * @param size
 * @returns Observable<ListEvents>
 */
  getEvents(size?: number): Observable<Events> {
    if (this.env.mock) {
      let mocks = Object.assign({}, this.mockedEvents.eventList);
      this.events = mocks;
      return of<Events>(this.events).pipe(delay(500));
    } else {
      return this.http.get<Events>(`${this.env.api.salus}/${this.portalService.portalData.domainId}
      /event-tasks?size=${size}`, httpOptions)
        .pipe(
          tap(data => {
            this._events = data;
            this.logService.log(this.events, LogLevels.info);
          }));
    }
  }

  /**
   * Get event by id
   * @param id event id
   */
  getEventById(id): Observable<Event> {
    if (this.env.mock) {
      let mock = Object.assign({}, this.mockedEvents.single)
      this.event = mock;
      return of<Event>(this.event).pipe(delay(500));
    }
    return this.http.get<Event>(`${this.env.api.salus}/${this.portalService.portalData.domainId}
    /event-tasks/${id}`, httpOptions)
      .pipe(
        tap(data => {
          this.setEvent = data;
          this.logService.log(this.event, LogLevels.info);
        })
      )
  }

  /**
 * @description
 * @param id string
 */
  deleteEvent(id: string): Observable<any> {
    if (this.env.mock) {
      return of<boolean>(true);
    } else {
      return this.http.delete<Event>(`${this.env.api.salus}/${this.portalService.portalData.domainId}
      /event-tasks/${id}`, httpOptions)
        .pipe(
          tap(data => {
            this.logService.log(this.event, LogLevels.info);
          })
        )
    }
  }
}
