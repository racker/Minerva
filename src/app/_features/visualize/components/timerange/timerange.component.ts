import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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

  @Input() end: Date;
  isValidDate: (x:any) => boolean = isValidDate;

  date: TimeRange;

  constructor(private route: ActivatedRoute, private router: Router,
    private metricService: MetricsService) {

  }
  ngOnInit(): void {
    // if no start date default to 24hr ago
    let start = this.start.toString() == '24HR' ? new Date(Date.now() - 86400 * 1000):
    new Date(this.start);
    let end = new Date(this.end);
    let presets = !(this.isValidDate(start) && this.isValidDate(end));

    this.date = {
      presets,
      duration: !(presets && this.duration)
      ? '24HR' : this.duration,
      start,
      end,
    };

    this.metricService.start = this.date.start.toString();
    this.metricService.end = this.date.end.toString();
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

}
