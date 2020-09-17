import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from '../../../../_services/events/events.service';
import { Event } from '../../../../_models/events';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.scss']
})
export class EventslistComponent implements OnInit {

  @ViewChild('delEventLink') delEvent:ElementRef;
  events:Event[];
  size:number = 1;
  selectedEvents: any = [];
  isDeleted : boolean = true;
  deleteLoading:boolean = false;

  modalType : string;
  eventText :string;
  message   : string;
  header:string;
  subscriber = new Subscription();

  constructor(private eventService:EventsService, private route : Router) { }

  ngOnInit(): void {
    this.modalType = 'delEventModal';
    this.getEvents();
  }

  getEvents() {
    this.subscriber=this.eventService.getEvents(this.size).subscribe(data =>{     
      this.events = data.content;
    })
  }

  selectEvent(event): void {
    let id = event.target.id.split("event-");
    if(event.target.checked) 
      this.selectedEvents.push(id[1]);
    else
    this.selectedEvents = this.selectedEvents.filter(item => item !== id[1])
    if(this.selectedEvents.length === 0)
    this.message = "Are you sure you'd like to delete this Event?";
    else 
    this.message = "Are you sure you'd like to delete these Events?";
  }

  triggerClose(flag:boolean) {
    if(flag)
    this.delEvent.nativeElement.click();
  }

  triggerConfirm() {
    this.selectedEvents.map((value) => { 
      this.eventService.deleteEvent(value).subscribe(data => {
          //console.log("data ", data);
          this.deleteLoading = false;
          this.delEvent.nativeElement.click();
          this.getEvents();
          //this.route.navigate(['/monitors']);
      }, () => {
        this.deleteLoading = false;
        this.delEvent.nativeElement.click();
      })
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
