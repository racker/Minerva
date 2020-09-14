import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from "../../../../_services/events/events.service";
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
declare const window: any;
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  $evnt: any;
  eventId: string;
  subsriptions = new Subscription();
  constructor(
    private eventSerice: EventsService,
    private spnService: SpinnerService,
    private route: ActivatedRoute) {
      this.spnService.changeLoadingStatus(true);
  }

  /**
   * Destroying the All subscriptions
   */
  ngOnDestroy(): void {
    this.subsriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getParams();
  }

  /**
   * get Id from the route as parameter
   */
  getParams() {
    this.route.params.subscribe((params: any) => {
      this.eventId = params.id;
      if(this.eventId)
        this.getEvent(this.eventId);
      else
        this.spnService.changeLoadingStatus(false);
    })
  }

  /**
   * Event subscription on the basis of event-id
   * @param id event id
   */
  getEvent(id) {
    this.$evnt = this.eventSerice.getEventById(id).pipe(
      tap((data) => {
        this.spnService.changeLoadingStatus(false);
      })
    )
    // adding subscription
    this.subsriptions.add(this.$evnt);
  }

  /**
   * Returns class name based on state
   * @param state string
   * @returns string
   */
  assignClassName(state: string): string {
    switch(state) {
      case 'CRITICAL': return 'state-critical';
      case 'INFO': return 'state-info';
      case 'OK': return 'state-ok';
      case 'WARNING': return 'state-warning';
    }
  }

}
