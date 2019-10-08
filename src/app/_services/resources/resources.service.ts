import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resources: {};
  private mockedResources = new resourcesMock();

  constructor(private http:HttpClient, private logService: LoggingService) { }

  get resources(): any {
    return this._resources;
  }

  set resources(value: any) {
    this._resources = value;
  }

  getResources(size: number, page: number): Observable<any> {
    if (environment.mock) {
      let pageNumber = --page;
      let mocks = Object.assign({}, this.mockedResources.collection);
      let slicedData = [... mocks.content.slice(pageNumber * size, (pageNumber + 1) * size)];
      this.resources = mocks;
      this.resources.content = slicedData
      return of(this.resources);
    }
    else {
    return this.http.get(`${environment.api.salus}/resources?size=${size}&page=${page}`, httpOptions)
    .pipe(
      tap(data =>
        { this.resources = data.content;
          this.logService.log(this.resources, LogLevels.info);
        }));
    }
  }

  // TODO: establish interface for return data of individual
  // resources
  getResource(id: number): Observable<any> {
    if (environment.mock) {
      return of(this.mockedResources.single);
    }
    else {
      return this.http.get(`${environment.api.salus}/resources/${id}`, httpOptions)
      .pipe(
        tap(data => {
          this.logService.log(`Resource: ${data}`, LogLevels.info);
        })
      );
    }
  }

  createResource(param:any): Observable<any> {
    return of();
  }

  updateResource(id:number): Observable<any> {
    return of();
  }

}
