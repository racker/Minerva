import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeRange } from '@minerva/_models/timerange';


@Component({
  selector: 'app-visualize-timerange',
  templateUrl: './timerange.component.html',
  styleUrls: [
    './timerange.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TimeRangeComponent implements OnInit {

  @Input() duration: any;
  @Input() start: Date ;

  @Input() end: Date;

  date: TimeRange;

  constructor(private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    let start = new Date(this.start);
    let end = new Date(this.end);
    let presets = !(this.isValidDate(start) && this.isValidDate(end));

    this.date = {
      presets,
      duration: presets
      ? '24HR' : this.duration,
      start,
      end,
    };
  }


  /**
   * On radio button change update navigation
   * @param duration Object
   * @return void
   */
  onDurationChange(duration:{}) {
    this.updateNavigation({duration});
  }


  timeRangeUpdate() {
    let start = this.date.start.toISOString();
    let end = this.date.end.toISOString();
    this.updateNavigation({start, end})
  }


  /**
   * Update query params on navigation
   * @param value Object
   * @returns void
   */
  updateNavigation(value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: value,
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Used to valid if a date is valid
   * @param d string
   * @returns boolean
   */
  isValidDate(d) {
    try {
      d.toISOString();
      return true;
    }
    catch(ex) {
      return false
    }
  }

}
