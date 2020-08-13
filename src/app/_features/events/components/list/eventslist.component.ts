import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../_services/events/events.service';
import { Event } from '../../../../_models/events';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.scss']
})
export class EventslistComponent implements OnInit {

  events:Event[];
  size:number = 1;
  subscriber = new Subscription();

  constructor(private eventService:EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.subscriber=this.eventService.getEvents(this.size).subscribe(data =>{     
      this.events = data.content;
    })
  }
}
