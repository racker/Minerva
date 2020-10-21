import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../../_services/logging/logging.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { Resource, Resources, CreateResource } from '../../_models/resources';
import { resourcesMock } from 'src/app/_mocks/resources/resources.service.mock';
import { PortalDataService } from '../portal/portal-data.service';

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
  constructor(private http:HttpClient, private portalService: PortalDataService,
    private logService: LoggingService) { }

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
      return of<Resources>(this.resources).pipe(delay(500));
    }
    else {
    return this.http.get<Resources>(`${environment.api.salus}/${this.portalService.portalData.domainId}
    /resources?size=${size}&page=${page}`, httpOptions)
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
    return this.http.get<Resource>(`${environment.api.salus}/${this.portalService.portalData.domainId}
    /resources/${id}`)
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
    return this.http.post<Resource>(`${environment.api.salus}/${this.portalService.portalData.domainId}
    /resources`, resource,  httpOptions)
    .pipe(
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
      return this.http.put<Resource>(`${environment.api.salus}/${this.portalService.portalData.domainId}
      /resources/${id}`, updatedData)
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
      return this.http.head(`${environment.api.salus}/${this.portalService.portalData.domainId}
      /resources/${id}`, {observe: 'response'});
  }

  searchResources(search: string): Observable<Resources> {
    return this.http.get<Resources>(`${environment.api.salus}/${this.portalService.portalData.domainId}
    /resources-search?q=${search}`)
    .pipe(
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
    return this.http.delete(`${environment.api.salus}/${this.portalService.portalData.domainId}
    /resources/${id}`)
      .pipe(
        tap(data => {
          this.logService.log(`Resource deleted: ${id}`, LogLevels.info);
        })
    );
  }

  /**
   * @description called function to delete multiple resources using promise.
   * @param id
   */

  deleteResourcePromise(id:string): Promise<any> {
    if(environment.mock) {
      return new Promise((resolve, reject) => {
          resolve(true);
      })
    }
    return this.http
      .delete(`${environment.api.salus}/${this.portalService.portalData.domainId}
      /resources/${id}`)
      .toPromise()
      .then(
        (res: Response) => Promise.resolve(res)
      )
      .catch(
        (err) => Promise.reject(err)
      );
  }




}
