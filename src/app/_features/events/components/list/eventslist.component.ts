import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../_services/events/events.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.scss']
})
export class EventslistComponent implements OnInit {


  subscriber = new Subscription();

  constructor(private eventService:EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    let size = 1;
    this.subscriber=this.eventService.getEvents(size).subscribe(data =>{     
      console.log("data from event service ", data);
      
    })
  }

}
