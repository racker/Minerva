import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../../_services/events/events.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event:any;
  constructor(private eventSerice: EventsService) { }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() {
    this.eventSerice.getEventById("1e2434f5-439d-42b5-aa3b-870aefd1b1e1").subscribe(data => {
      this.event= data;
      console.log(data);
    })
  }

  

}
