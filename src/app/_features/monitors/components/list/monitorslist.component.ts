import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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

  @ViewChild('confirmMonitor') confirmMonitor:ElementRef;
  @ViewChild('delMonitorLink') delMonitor:ElementRef;
  @ViewChild('chkColumn') chkColumn:ElementRef;

  monitorSearchPlaceholderText: string;
  monitors: any[];
  total: number;
  page: number = 0;
  successCount: number = 0;
  progressVal: number = 0;
  disableOk: boolean = true;
  modalType : string = 'delMonitorModal';
  message   : string = 'Are you sure you want to delete the selected monitors?';
  confirmMessageSuccess : string = "";
  confirmMessageError : string = "";
  defaultAmount: number = environment.pagination.pageSize;
  Object: Object = Object;
  selectedMonitors: any = [];
  selectedMonForDeletion:any = [];
  monitorArr:any = [];


  monitorUtil = MonitorUtil;
  constructor(private monitorService: MonitorService,
    private spnService: SpinnerService,
    private router: Router, private changeDetector: ChangeDetectorRef) { this.spnService.changeLoadingStatus(true); }

  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchMonitors();
    });
  }

  ngOnInit() {
    this.fetchMonitors();
  }

  fetchMonitors() {
      this.monitorService.getMonitors(this.defaultAmount, this.page)
        .subscribe(data => {
          this.spnService.changeLoadingStatus(false);
          this.monitors = this.monitorService.monitors.content;
          this.total    = this.monitorService.monitors.totalElements;
          this.monitorSearchPlaceholderText = `Search ${this.total} monitors`;
          this.changeDetector.detectChanges();
        });
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

    /**
   * @description function called when to close confirmation modal as customer don't want to delete selected monitor.
   * @param flag
   *
   */

  triggerClose(flag) {
    if(flag)
      this.delMonitor.nativeElement.click();
  }

   /**
   * @description function called when to close progress bar modal by click on OK button.
   * open and close attributes are used to open and close modal.
   *
   */

  triggerOk() {
    if(this.chkColumn.nativeElement.checked) 
    this.reset();    
    this.confirmMonitor.nativeElement.removeAttribute("open");   
    this.confirmMonitor.nativeElement.setAttribute("close", "true");    
    this.selectedMonitors.map(item => {
      this.monitors = this.monitors.filter(a => a.id !== item.id);
    });  
    this.selectedMonitors = [];
    this.fetchMonitors();
  }

  /**
   * @description call function once delete operation completed
   * 
   */
  reset() {
    this.monitors.forEach(e => {
      if(e.checked)
        e.checked = false;
        this.chkColumn.nativeElement.checked = false;
    });
  }

   /**
   * @description Function called after confirm delete. selectedMonitors are list of resources selected for deletion.
   * monitorErrArr for storing ids which are already deleted or not found.
   * confirmMessageError and confirmMessageSuccess fields are showing success and error messages.
   *
   */

  triggerConfirm() {
    this.selectedMonForDeletion = [];
    this.disableOk              = true;
    this.delMonitor.nativeElement.click();
    this.selectedMonitors.forEach((element, index) => {
        var id = this.monitorService.deleteMonitorPromise(element.id).then((resp) => { 
            this.successCount++;
            this.progressBar(index++, {monitor:this.monitors.filter(a => a.id === element.id)[0], error: false});
        }).catch(err => {
            this.progressBar(index++, {monitor:this.monitors.filter(a => a.id === element.id)[0], error: true});
        });
        this.monitorArr.push(id);
    })
    Promise.all(this.monitorArr)
      .then(data => {
        this.disableOk  = false;
        this.confirmMonitor.nativeElement.setAttribute("open", "true");
      });
  }

  progressBar(d, obj:any) {    
    this.progressVal = (d * 100) / this.selectedMonForDeletion.length;
    this.selectedMonForDeletion.push(obj);
  }
}
