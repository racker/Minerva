import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../../_services/events/events.service";
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { tap } from 'rxjs/operators';
declare const window: any;
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  $evnt:any;
  Object = window.Object;
  constructor(private eventSerice: EventsService, private spnService: SpinnerService) {
    this.spnService.changeLoadingStatus(true);
   }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() {
    this.$evnt=this.eventSerice.getEventById("1e2434f5-439d-42b5-aa3b-870aefd1b1e1").pipe(
      tap((data)=>{
        this.spnService.changeLoadingStatus(false);
        console.log(data);
      })
    )
   
  }

  

}
