import { default as monitorsCollection } from './collection.json';
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
  page: number;
  size: number;


  handleRoute(url: string, method: string, request: HttpRequest<any>, next: any) {
    this.page = +request.params.get('page');
    this.size = +request.params.get('size');
    switch (true) {
      case url.endsWith('/test-monitor') && method === 'POST':
        return new HttpResponse({ status: 200, body: (this.monitorTest() as any) });
      case url.includes('/monitors-search') && method === 'GET':
        return new HttpResponse({ status: 200, body: (this.searchMonitors() as any) });
      case url.includes('/monitors') && method === 'GET' && this.size > 0:
        return new HttpResponse({ status: 200, body: (this.getMonitors(this.size, this.page) as any) });
      case url.match(/\/monitors\/[a-zA-Z0-9-_:]+$/) && method === 'GET':
        return new HttpResponse({ status: 200, body: (this.getMonitor() as any) });
      case url.endsWith('/monitors') && method === 'POST':
        return new HttpResponse({ status: 201, body: (this.createMonitor() as any) });
      case url.match(/\/monitors\/[a-zA-Z0-9-_:]+$/) && method === 'PATCH':
        return new HttpResponse({ status: 200, body: (this.updateMonitor() as any) });
      case url.match(/\/monitors\/[a-zA-Z0-9-_:]+$/) && method === 'DELETE':
        return new HttpResponse({ status: 204, body: (this.deleteMonitor() as any) });
      case url.includes('/bound-monitors') && method === 'GET':
        return new HttpResponse({ status: 200, body: (this.getBoundMonitor() as any) });
      default:
        return () => { return next.handle(request); }
    }
  }

  /**
   * @description Gets a list of monitors
   * @param size number
   * @param page number
   * @returns Observable<Monitors>
   */
  getMonitors(size: number, page: number) {
    let monitors: any;
    let mocks = Object.assign({}, this.collection);
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
  getMonitor() {
    return this.single;
  }

  /**
   * Create a new monitor
   * @param monitor formatted monitor to be created
   * @returns Observable<Monitor>
   */
  createMonitor() {
    return this.single;
  }


  /**
   * Update a monitor using patch method
   * @param id string
   * @param details any[]
   * @returns Observable<Monitor>
   */
  updateMonitor() {
    return this.single;
  }

  /**
   * @description Deletes a monitor
   * @param id string
   */
  deleteMonitor() {
    return true;
  }
  /**
   * @description Get monitors list associated with a resource.
   * @param resourceId string
   * @param monitorId string
   */
  getBoundMonitor(){
    return this.boundMonitor;
  }

  searchMonitors(){
    let monitors: any;
    let mocks = Object.assign({}, this.collection);
    monitors = mocks;
    let slicedData = [...mocks.content.slice(0 * 10, 1 * 10)];
    monitors.content = slicedData;
    return monitors;
  }

  monitorTest(){
    return this.testMonitor;
  }
}
