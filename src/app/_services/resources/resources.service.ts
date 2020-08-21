import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock';
import { Resource, Resources, CreateResource } from '../../_models/resources';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resources: Resources;
  private _resource: Resource;

  private mockedResources = new resourcesMock();
  constructor(private http:HttpClient, private logService: LoggingService) { }

  get resources(): Resources {
    return this._resources;
  }

  set resources(value: Resources) {
    this._resources = value;
  }

  get resource(): Resource {
    return this._resource;
  }

  set resource(value: Resource) {
    this._resource = value;
  }

  /**
   * Gets a list of Resources
   * @param size
   * @param page
   * @returns Observable<Resources>
   */
  getResources(size?: number, page?: number): Observable<Resources> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedResources.collection);
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.resources = mocks;
      this.resources.content = slicedData;
      return of<Resources>(this.resources);
    }
    else {
    return this.http.get<Resources>(`${environment.api.salus}/resources?size=${size}&page=${page}`, httpOptions)
    .pipe(
      tap(data =>
        { this._resources = data;
          this.logService.log(this.resources, LogLevels.info);
        }));
    }
  }

  /**
   * Gets a single Resource
   * @param id
   * @returns Observable<Resource>
   */
  getResource(id: string): Observable<Resource> {
    if (environment.mock) {
      this._resource = this.mockedResources.single;
      return of<Resource>(this.mockedResources.single);
    }
    else {
      return this.http.get<Resource>(`${environment.api.salus}/resources/${id}`)
      .pipe(
        tap(data =>
          {
            this._resource = data;
            this.logService.log(`Resource: ${data}`, LogLevels.info);
          })
      );
    }
  }

  /**
   * @description Creates a resource with preliminary resource object
   * @param resource CreateResource
   * @returns Resource
   */
  createResource(resource:CreateResource): Observable<Resource> {
    if (environment.mock) {
      this._resource = this.mockedResources.single;
      return of<Resource>(this.mockedResources.single);
    }
    else {
    return this.http.post<Resource>(`${environment.api.salus}/resources`,
    resource ,httpOptions).pipe(
      tap(data =>
        { this._resource = data;
          this.logService.log(data, LogLevels.info);
        }));
    }
  }

  /**
   * Updates a resource
   * @param id string
   * @param updatedData {[key: string]: any}
   * @returns Observable<Resource>
   */
  updateResource(id:string, updatedData: {[key: string]: any}): Observable<Resource> {
    if (environment.mock) {
      this._resource = this.mockedResources.single
      return of<Resource>(this.mockedResources.single);
    }
    else {
      return this.http.put<Resource>(`${environment.api.salus}/resources/${id}`,
      updatedData)
      .pipe(
        tap(data => {
          this._resource = data,
          this.logService.log(`Resource: ${data}`, LogLevels.info);
        })
      )
    }
  }

  /**
   * @description Validates that the resourceId being created isn't alreay in use
   * by the tenant, as these must be unique on a per tenant basis
   * @param id string
   * @returns HttpResponse of empty object OR a boolean when in offline mode
    */
  validateResourceId(id:string): any {
    if (environment.mock) {
      return throwError(new HttpErrorResponse({
        error: 'Not Found',
        status: 404
      }));
    }
    else {
      return this.http.head(`${environment.api.salus}/resources/${id}`, {observe: 'response'});
    }
  }

  searchResources(search:string): Observable<Resources> {
    if (environment.mock) {
      let mocks = Object.assign({}, this.mockedResources.collection);
      this.resources = mocks;
      let slicedData = [... mocks.content.slice(0 * 10, 1 * 10)];
      this.resources.content = slicedData;
      return of<Resources>(this.resources);
    }
    else {
      return this.http.get<Resources>(`${environment.api.salus}/resources-search/`, {
        params: {
          q: search
        }
      }).pipe(
        tap(data => {
          this.logService.log(`Search Resources`, LogLevels.info);
        })
      )
    }
  }

  /**
   * @description
   * @param id string
   */
  deleteResource(id:string) {
    if (environment.mock) {
      return of<boolean>(true);
    }
    else {
      return this.http.delete(`${environment.api.salus}/resources/${id}`)
      .pipe(
        tap(data => {
          this.logService.log(`Resource deleted: ${id}`, LogLevels.info);
        })
      )
    }
  }
}
