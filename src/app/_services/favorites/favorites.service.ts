import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favorite } from '../../_models/favorites';
import { EnvironmentConfig } from '../config/environmentConfig.service';
import { PortalDataService } from '../portal/portal-data.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient, private env: EnvironmentConfig, private portalService: PortalDataService) { }

 

  /**
 * @description
 * @param id string
 */
  addToFavorites(query:string): Observable<any> {

    return this.http.post(`${this.env.api.minerva}/favorites`, query, httpOptions)
        .pipe(
          tap(data => {
              console.log("data inside favorites api ", data);
          }));


  }
}
