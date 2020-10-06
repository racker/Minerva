import { default as monitorsCollection} from './collection.json';
import { default as monitorSingle } from './single.json';
import { default as schema } from './schema.json';
import { default as boundMonitor } from "./boundMonitor.json";
import { default as testMonitor } from './test-monitor.json';
import { Monitor, Monitors, TestMonitor } from 'src/app/_models/monitors';
import { BoundMonitorPaging } from 'src/app/_models/resources';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export class monitorsMock {
    collection = monitorsCollection;
    single = monitorSingle;
    schema = schema;
    boundMonitor = boundMonitor;
    testMonitor = testMonitor;
    private _monitors: Monitors;
    private _monitor: Monitor;
    private _boundMonitor: BoundMonitorPaging;
    page: number;
    size: number;
    get monitors(): Monitors {
        return this._monitors;
      }
    
      set monitors(value: Monitors) {
        this._monitors = value;
      }
    
      get monitor(): Monitor {
        return this._monitor
      }
    
      set monitor(value: Monitor) {
        this._monitor = value;
      }


      handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
        this.page = +request.params.get('page');
        this.size = +request.params.get('size');
        switch (true) {
            case url.includes('/monitors') && method === 'GET'&& this.size > 0 :
                return new HttpResponse({ status: 200, body: (this.getMonitors(this.size, this.page) as any) });
            case url.match(/\/monitors\/[a-zA-Z0-9-_:]+$/) && method === 'GET' :
                return new HttpResponse({ status: 200, body: (this.getMonitor( ) as any) });
            case url.endsWith('/monitors') && method === 'POST' :
                return new HttpResponse({ status: 201, body: (this.createMonitor() as any) });
        }
    }
    
      /**
       * @description Gets a list of monitors
       * @param size number
       * @param page number
       * @returns Observable<Monitors>
       */
      getMonitors(size: number, page: number){
        let monitors:any;
        let mocks = Object.assign({}, new monitorsMock().collection);
        let slicedData = [...mocks.content.slice(page * size, (page + 1) * size)];
        monitors = mocks;
        monitors.content = slicedData;
        return monitors;
         
      }
    
    /**
     * @description Gets a single monitor
     * @param id string
     * @returns Observable<Monitor>
     */
      getMonitor(){
          this._monitor = this.single;
          return this.single;
      }
    
      /**
       * Create a new monitor
       * @param monitor formatted monitor to be created
       * @returns Observable<Monitor>
       */
      createMonitor(){
              this._monitor = this.single;
              return this.single;
      }
    
    
      /**
       * Update a monitor using patch method
       * @param id string
       * @param details any[]
       * @returns Observable<Monitor>
       */
      updateMonitor(): Observable<Monitor> {
          this._monitor = this.single;
          return of<Monitor>(this.single);
      }
    
      /**
       * @description Deletes a monitor
       * @param id string
       */
      deleteMonitor(): Observable<any> {
          return of<boolean>(true);
      
      }
    
    
        /**
       * @description called function to delete multiple monitors using promise.
       * @param id 
       */
    
      deleteMonitorPromise(): Promise<any> {
          return new Promise((resolve, reject) => {
              resolve(true);
          })
      }
    
    
    /**
     * @description Get monitors list associated with a resource.
     * @param resourceId string
     * @param monitorId string
     */
      getBoundMonitor():Observable<BoundMonitorPaging>{
          this._boundMonitor=this.boundMonitor;
          return of<BoundMonitorPaging>(this._boundMonitor);
      }
    
      searchMonitors(search:string): Observable<Monitors> {
          let mocks = Object.assign({}, this.collection);
          this.monitors = mocks;
          let slicedData = [... mocks.content.slice(0 * 10, 1 * 10)];
          this.monitors.content = slicedData;
          return of<Monitors>(this.monitors);
      }
    
      monitorTest(): Observable<TestMonitor> {
          return of<TestMonitor>(this.testMonitor);
      }
}
