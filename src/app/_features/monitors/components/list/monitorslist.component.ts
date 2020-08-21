import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Monitor, Monitors } from '../../../../_models/monitors';
import { MonitorUtil } from '../../mon.utils';
import { SpinnerService } from '../../../../_services/spinner/spinner.service';
import { Router } from '@angular/router';
import { isAdmin } from 'src/app/_shared/utils';

@Component({
  selector: 'app-monitorslist',
  templateUrl: './monitorslist.component.html',
  styleUrls: ['./monitorslist.component.scss']
})
export class MonitorslistComponent implements OnInit {
  monitorSearchPlaceholderText: string;
  monitors: any[];
  total: number;
  page: number = 0;
  defaultAmount: number = environment.pagination.pageSize;
  fetchMonitors: any;
  Object: Object = Object;
  selectedMonitors: any = [];

  monitorUtil = MonitorUtil;
  constructor(private monitorService: MonitorService,
    private spnService: SpinnerService,
    private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.monitorService.getMonitors(this.defaultAmount, this.page)
        .subscribe(data => {
          this.spnService.changeLoadingStatus(false);
          this.monitors = this.monitorService.monitors.content;
          this.total = this.monitorService.monitors.totalElements;
          this.monitorSearchPlaceholderText = `Search ${this.total} monitors`;
      });
    });
  }

  ngOnInit() {
    if(!environment.mock) {
      setTimeout(() => {
        this.spnService.changeLoadingStatus(true);
      }, 0);
    }
    this.fetchMonitors = () => {
      return this.monitorService.getMonitors(this.defaultAmount, this.page)
        .subscribe(data => {
          this.spnService.changeLoadingStatus(false);
          this.monitors = this.monitorService.monitors.content;
          this.total = this.monitorService.monitors.totalElements;
          this.monitorSearchPlaceholderText = `Search ${this.total} monitors`;
      });
    }
    this.fetchMonitors();
  }

  isAdminRoute(monId) {
    return isAdmin(this.router) ? `/admin/monitors/details/${monId}`  : `/monitors/details/${monId}`
  }

  /**
   * Check when search is in progress
   * @param event
   */

   monitorsSearch(searching:boolean): void {
    if (searching) {
      this.spnService.changeLoadingStatus(true);
    }
    else {
      this.spnService.changeLoadingStatus(false);
    }
   }

   /**
    * Reset search
    * @param event
    *
    */

    resetSearch(): void {
        this.monitors = this.monitorService.monitors.content;
        this.total    = this.monitorService.monitors.totalElements;
    }

    /**
     * Function which accepts event emitted from search
     * @param event
     *
     */

    monitorResults(monitors: Monitors): void {
      this.monitors = monitors.content;
      this.total    = monitors.totalElements;
    }

  /**
   * @description check column event for items in tables, selects monitor item
   * @param event any
   * @returns void
   */
  checkColumn(event) {
    if (event.target.checked) {
      this.selectedMonitors = this.monitors.map(x => Object.assign({}, x));
    }
    else {
      this.selectedMonitors = [];
    }
    this.monitors.forEach(e => {
      e["checked"] = event.target.checked;
    });
  }

  /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
  goToPage(n: number): void {
    this.page = n;
    this.fetchMonitors();
  }

  /**
   * @description <app-pagination>
   */
  nextPage(): void {
    this.page++;
    this.fetchMonitors();
  }

  /**
   * @description <app-pagination>
   */
  prevPage(): void {
    this.page--;
    this.fetchMonitors();
  }

  /**
   * @description Add selected monitors to an array for actions
   * @param monitor Monitor
   */
  selectMonitors(monitor: Monitor) {
    if (this.selectedMonitors.indexOf(monitor) === -1) {
      this.selectedMonitors.push(monitor);
    } else {
      this.selectedMonitors.splice(
        this.selectedMonitors.indexOf(monitor), 1
      );
    }
  }
}
