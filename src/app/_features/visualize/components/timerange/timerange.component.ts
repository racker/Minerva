import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeRange } from '@minerva/_models/timerange';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { isValidDate } from '@minerva/_shared/utils';


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
  @Output() timeRangeEmitter: EventEmitter<any> = new EventEmitter();
  @Input() end: Date;
  @Input() presetData: { key: string, value: string }[] = [
    { value: '1h', key: '1 HR' },
    { value: '8h', key: '8 HR' },
    { value: '24h', key: 'DAY' },
    { value: '7d', key: 'WEEK' },
    { value: '1n', key: 'MONTH' },
  ];

  date: TimeRange;

  datevalidate=isValidDate;
  constructor(private route: ActivatedRoute, private router: Router,
    private metricService: MetricsService) {

  }
  ngOnInit(): void {
    // if no start date default to 24hr ago
    let start = this.start.toString() == '24h' ? new Date(Date.now() - 86400 * 1000):
    new Date(this.start);
    let end = new Date(this.end);
    let presets = !(isValidDate(start) && isValidDate(end));

    this.date = {
      presets,
      duration: this.duration
      ? this.duration:'24h' ,
      start,
      end,
    };

    this.metricService.start = this.date?.start?.toString();
    this.metricService.end = this.date?.end?.toString();
  }


  /**
   * On radio button change update navigation  ([0-9]+)(ms|s|m|h|d|w|n|y)-ago 
   * millis(ms), seconds(s), mins(m), hours(h), days(d), weeks(w), month(n),year(y)
   * @param duration Object
   * @return void
   */
  onDurationChange(duration:{}) {
    this.timeRangeEmitter.emit({start:`${duration}`});
    this.date.start=null;
    this.date.end = null;
  }


  timeRangeUpdate() {
    let start = new Date((this.date.start).setSeconds(0)).toISOString();
    let end = new Date((this.date.end).setSeconds(0)).toISOString();
    this.date.duration= null;
    this.timeRangeEmitter.emit({start, end});
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
}
