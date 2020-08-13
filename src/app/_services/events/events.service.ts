import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment} from "../../../environments/environment";
import { Event } from "../../_models/events";

const httpOption = {
  headers: new HttpHeaders({
     'Content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  
}
