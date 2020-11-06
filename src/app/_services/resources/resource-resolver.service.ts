import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Resource } from 'src/app/_models/resources';
import { ResourcesService } from 'src/app/_services/resources/resources.service';


@Injectable({ providedIn: 'root' })
export class ResourceResolver implements Resolve<Resource> {
  constructor(private resourceService: ResourcesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
      // this.resourceService.getResources(); // api you want to return for particular route
   }
}