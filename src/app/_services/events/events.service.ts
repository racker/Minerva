import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Event } from "../../_models/events";
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { EventsMock } from "../../_mocks/events/events.service.mock";

const httpOption = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventMock= new EventsMock();

  private event;


  public get getEvent() {
    return this.event
  }

  public set setEvent(v: any) {
    this.event = v;
  }

  constructor(private http: HttpClient, private logService: LoggingService) { }

  getEventById(id): Observable<Event> {
    if (environment.mock) {
      let mock = Object.assign({},this.eventMock.single)
      this.event= mock;
      return of<Event>(this.event);
    }
    return this.http.get<Event>(`${environment.api.salus}/event-tasks/${id}`, httpOption)
      .pipe(
        tap(data => {
          this.setEvent = data;
          this.logService.log(this.event, LogLevels.info);
        })
      )
  }

}
