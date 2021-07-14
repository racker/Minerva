import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeRange } from '@minerva/_models/timerange';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import moment from "moment";


export const presetDates: { key: string, value: string }[] = [
  { value: '1h-ago', key: '1 HR' },
  { value: '8h-ago', key: '8 HR' },
  { value: '24h-ago', key: 'DAY' },
  { value: '7d-ago', key: 'WEEK' },
  { value: '1n-ago', key: 'MONTH' },
];

@Component({
  selector: 'app-visualize-timerange',
  templateUrl: './timerange.component.html',
  styleUrls: [
    './timerange.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TimeRangeComponent implements OnInit {

  @Input() start: Date ;
  @Output() timeRangeEmitter: EventEmitter<any> = new EventEmitter();
  @Input() end: Date;
  presetData = presetDates;
  defaultSelection:string;

  date: TimeRange;

  datevalidate = moment.isDate;
  constructor(private route: ActivatedRoute, private router: Router,
    private metricService: MetricsService) {

  }
  ngOnInit(): void {
    // if no start date default to 24hr ago
    let preset = this.presetData.find(({ value }) => value === this.start.toString())?.value;
    let start = !!preset ? null : new Date(this.start);
    let end = new Date(this.end);

    this.defaultSelection = preset;
    this.date = {
      presets : !!preset,
      start,
      end,
    };
  }


  /**
   * On radio button change update navigation  ([0-9]+)(ms|s|m|h|d|w|n|y)-ago
   * millis(ms), seconds(s), mins(m), hours(h), days(d), weeks(w), month(n),year(y)
   * @param duration Object
   * @return void
   */
  onDurationChange(duration:{}) {
    this.timeRangeEmitter.emit({start:`${duration}`});
    this.date.start = null;
    this.date.end = null;
  }


  timeRangeUpdate() {
    let start = new Date((this.date.start).setSeconds(0)).toISOString();
    let end = new Date((this.date.end).setSeconds(0)).toISOString();
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
