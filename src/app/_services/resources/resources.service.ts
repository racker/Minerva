import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock'
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from 'ngrx-data'
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Resources, Resource } from '../../_models/resource';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class ResourcesService extends DefaultDataService<Resource> {

  private mockedResources = new resourcesMock();
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger,
    private logService: LoggingService) {
    super('Resource', http, httpUrlGenerator);
    logger.log('Created custom Resource EntityDataService');
  }

  getAll(): Observable<Resource[]> {
    return super.getAll();
  }

  getById(id: string | number): Observable<Resource> {
    return super.getById(id);
  }

  getWithQuery(params: string | QueryParams): Observable<any> {
    if (environment.mock) {
      let size = parseInt(params['size']);
      let pageNumber = parseInt(params['page']);
      pageNumber = --pageNumber;
      let mocks = Object.assign({}, this.mockedResources.collection);
      let slicedData = [... mocks.content.slice(pageNumber * size, (pageNumber + 1) * size)];
      let resources = mocks;
      resources.content = slicedData
      return of(resources);
      /*
      let pageNumber = --parseInt(params['page']);
      le=t mocks = Object.assign({}, this.mockedResources.collection);
      let slicedData = [... mocks.content.slice(pageNumber * size, (pageNumber + 1) * size)];
      this.resources = mocks;
      this.resources.content = slicedData
      return of(this.resources);
      */
    }
    else {
    return super.getWithQuery(params)
    .pipe(
      tap(data => {
        this.logService.log(`Resource: ${data}`, LogLevels.info);
      })
      );
    }
  }
}












/*
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
        { this.resources = data;
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
*/