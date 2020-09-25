import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { Resource, Resources, CreateResource } from '../../_models/resources';

const httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private _resources: Resources;
  private _resource: Resource;

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
    return this.http.get<Resources>(`${environment.api.salus}/resources`, {
      headers: httpOptions,
      params: {
        size: `${size}`,
        page: `${page}`
      }})
      .pipe(
        tap(data => {
          this._resources = data;
          this.logService.log(this.resources, LogLevels.info);
        }));
  }

  /**
   * Gets a single Resource
   * @param id
   * @returns Observable<Resource>
   */
  getResource(id: string): Observable<Resource> {
    return this.http.get<Resource>(`${environment.api.salus}/resources/${id}`)
      .pipe(
        tap(data => {
          this._resource = data;
          this.logService.log(`Resource: ${data}`, LogLevels.info);
        })
      );
  }

  /**
   * @description Creates a resource with preliminary resource object
   * @param resource CreateResource
   * @returns Resource
   */
  createResource(resource: CreateResource): Observable<Resource> {
    return this.http.post<Resource>(`${environment.api.salus}/resources`,
      resource, {
        headers: httpOptions
      }).pipe(
        tap(data => {
          this._resource = data;
          this.logService.log(data, LogLevels.info);
        }));
  }

  /**
   * Updates a resource
   * @param id string
   * @param updatedData {[key: string]: any}
   * @returns Observable<Resource>
   */
  updateResource(id:string, updatedData: {[key: string]: any}): Observable<Resource> {
      return this.http.put<Resource>(`${environment.api.salus}/resources/${id}`,
      updatedData)
      .pipe(
        tap(data => {
          this._resource = data,
          this.logService.log(`Resource: ${data}`, LogLevels.info);
        })
      );
  }

  /**
   * @description Validates that the resourceId being created isn't alreay in use
   * by the tenant, as these must be unique on a per tenant basis
   * @param id string
   * @returns HttpResponse of empty object OR a boolean when in offline mode
    */
  validateResourceId(id:string): any {
      return this.http.head(`${environment.api.salus}/resources/${id}`,
      {observe: 'response'});
  }

  searchResources(search: string): Observable<Resources> {
    return this.http.get<Resources>(`${environment.api.salus}/resources-search/`, {
      params: {
        q: search
      }
    }).pipe(
      tap(data => {
        this.logService.log(`Search Resources`, LogLevels.info);
      })
    );
  }

  /**
   * @description
   * @param id string
   */
  deleteResource(id: string) {
    return this.http.delete(`${environment.api.salus}/resources/${id}`)
      .pipe(
        tap(data => {
          this.logService.log(`Resource deleted: ${id}`, LogLevels.info);
        })
    );
  }
}
