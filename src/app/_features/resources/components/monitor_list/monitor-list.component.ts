
import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { MonitorService } from "../../../../_services/monitors/monitor.service";
import { BoundMonitorPaging, BoundMonitor } from 'src/app/_models/resources';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/_models/common';
@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {

  public pagination:Pagination= {
    totalElements:5,
    number:0
  }
  isLoading: boolean = false;
  monitors:BoundMonitor[];
  @Input() resourceId:string;
  subscriber = new Subscription();

  constructor(private mntor:MonitorService) { }

  ngOnInit(): void {
    this.getMonitors();
  }

  getMonitors(){
    this.subscriber=this.mntor.getBoundMonitor({resourceId : this.resourceId, size: this.pagination.totalElements, page: this.pagination.number}).subscribe(data =>{      
      this.monitors= data.content;
      this.pagination.totalPages = data.totalElements;
      this.isLoading = false;
    })
  }

  /**
   * @description <app-pagination>
   * @param n number
   * @returns void
  */
  goToPage(n: number): void {
    this.pagination.number = n;
    this.isLoading = true;
    this.getMonitors();
  }

  /**
   * @description <app-pagination>
   */
  nextPage(): void {
    this.pagination.number++;
    this.isLoading = true;
    this.getMonitors();
  }

  /**
   * @description <app-pagination>
   */
  prevPage(): void {
    this.pagination.number--;
    this.isLoading = true;
    this.getMonitors();
  }
  
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
