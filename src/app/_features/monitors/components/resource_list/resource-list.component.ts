import { Component, OnInit, Input } from '@angular/core';
import { BoundMonitor } from 'src/app/_models/resources';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/_models/common';
import { isAdmin } from 'src/app/_shared/utils';
import { MonitorUtil } from 'src/app/_features/monitors/mon.utils'
import { Router } from '@angular/router';
import { Monitor, TestMonitor } from 'src/app/_models/monitors';
import { CreateTestMonitor } from '../../interfaces/testMonitor.interface';
@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  public pagination:Pagination={
    totalElements:5,
    number:0
  }
  isLoading: boolean = false;
  resources:BoundMonitor[];
  isAdmin = isAdmin;
  testMonitorResults: TestMonitor;
  monitorUtil = MonitorUtil;
  isTestLoading: boolean = true;
  Object = window.Object;
  @Input() monitor: Monitor;
  subscriber = new Subscription();
  constructor(private mntor : MonitorService, public router: Router) { }

  /**
   * @description Default (ngOnInit) function called when component loads for the first time.
   */

  ngOnInit(): void {
    this.getResources();
  }

  /**
   * @description call getResources function to get all bound resources which is bound to speicific monitor.
   * @param monitorId string
  */

  getResources(){
    this.subscriber=this.mntor.getBoundMonitor({monitorId : this.monitor.id, size: this.pagination.totalElements, page: this.pagination.number}).subscribe(data =>{
      this.resources = data.content;
      this.pagination.totalPages = data.totalElements;
      this.isLoading = false;
    });
  }

  testMonitor(resourceId) {
    let monitorData:CreateTestMonitor = MonitorUtil.formatTestMonitor(resourceId, this.monitor);
    this.mntor.monitorTest(monitorData).subscribe((data) => {
      this.isTestLoading = false;
      this.testMonitorResults = data;
    });
  }

    /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
 goToPage(n: number): void {
  this.pagination.number = n;
  this.isLoading = true;
  this.getResources();
}

/**
 * @description <app-pagination>
 */
nextPage(): void {
  this.pagination.number++;
  this.isLoading = true;
  this.getResources();
}

/**
 * @description <app-pagination>
 */
prevPage(): void {
  this.pagination.number--;
  this.isLoading = true;
  this.getResources();
}

  /**
   * @description call ngOnDestroy function when to unsubscribe subscriber param which is subscribed to fetch resources.
   * @field this.subscriber
   */

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
