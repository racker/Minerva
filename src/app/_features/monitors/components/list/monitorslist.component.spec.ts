import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MonitorslistComponent } from './monitorslist.component';
import { MonitorService } from '../../../../_services/monitors/monitor.service';
import { MonitorsPage } from '../../pages/monitors/monitors.page';
import { monitorsMock } from '../../../../_mocks/monitors/monitors.service.mock'
import { environment } from '../../../../../environments/environment';
import { Monitor } from 'src/app/_models/monitors';
import { MonitorUtil } from '../../mon.utils';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { mockResourcesProvider } from 'src/app/_interceptors/mock-resources.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

var mockMonitor: Monitor = {
  "id": "76WE85UV",
  "name": "Ping - DFW",
  "interval": "PT1M30S",
  "labelSelectorMethod": "AND",
  "labelSelector": {
    "additionalProp1": "EC2Instance",
    "additionalProp2": "Prod",
    "additionalProp3": "Node API"
  },
  "details": {
    "type": "local",
    "plugin": {
      "type": "cpu",
      "message": "162.242.171.102 (IPv4)"
    }
  },
  "createdTimestamp": "2019-12-31T19:04:50.630736Z",
  "updatedTimestamp": "2019-12-31T19:04:50.630788Z"
};

describe('MonitorslistComponent', () => {
  let injector: TestBed;
  let component: MonitorslistComponent;
  let fixture: ComponentFixture<MonitorslistComponent>;
  let monitorService: MonitorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MonitorslistComponent, MonitorsPage, PaginationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        MonitorService,
        mockResourcesProvider
      ]
    })
      .compileComponents();
      injector = getTestBed();
    fixture = TestBed.createComponent(MonitorslistComponent);
    component = fixture.componentInstance;
    monitorService = injector.get(MonitorService);
    component.ngOnInit();
    fixture.detectChanges();
  }));

  // beforeEach(() => {
  //   injector = getTestBed();
  //   fixture = TestBed.createComponent(MonitorslistComponent);
  //   component = fixture.componentInstance;
  //   monitorService = injector.get(MonitorService);
  //   component.ngOnInit();
  //   fixture.detectChanges();
  // });
  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should resolve monitors', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.monitors).toEqual(new monitorsMock().collection.content
      .slice(0 * environment.pagination.monitors.pageSize, 1 * environment.pagination.monitors.pageSize));
  });

  it('should assign total amount of monitors', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.total).toEqual(30);
  });

  it('should assign current page', () => {
    expect(component.page).toEqual(0);
  });

  it('should create correct placeholder text', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.monitorSearchPlaceholderText).toEqual('Search 30 monitors');
  });

  it('should add MonUtil to project', () => {
    expect(component.monitorUtil).toEqual(MonitorUtil);
  });

  it('should add all monitors', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    var checked = { target: { checked: true } };
    component.checkColumn(checked);
    component.selectedMonitors.forEach(e => {
      e.checked = true;
    });

    expect(component.monitors)
      .toEqual(component.selectedMonitors);
  });

  it('should remove all monitors', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    var unchecked = { target: { checked: false } };
    component.checkColumn(unchecked);
    expect(component.selectedMonitors).toEqual([]);
  });

  it('should select a monitor', () => {
    component.selectMonitors(mockMonitor);
    expect(component.selectedMonitors[0]).toEqual(mockMonitor);
  });

  it('should remove a selected monitor', () => {
    component.selectMonitors(mockMonitor);
    component.selectMonitors(mockMonitor);
    expect(component.selectedMonitors.indexOf(mockMonitor)).toEqual(-1);
  });

  it('should goto page', () => {
    component.goToPage(2);
    expect(component.page).toEqual(2);
  });

  it('should goto next page', () => {
    component.nextPage();
    expect(component.page).toEqual(1);
  });

  it('should goto previous page', () => {
    component.goToPage(2);
    component.prevPage();
    expect(component.page).toEqual(1);
  });

  it('should listen for triggerOk', () => {
    component.monitors = new monitorsMock().collection.content;
    component.triggerOk();
    expect(component.confirmMonitor.nativeElement.getAttribute('close')).toBe('true');
    expect(component.confirmMonitor.nativeElement.getAttribute('open')).toBeNull;
  });

  it('should listen for triggerClose', () => {
    let spy = spyOn(component.delMonitor.nativeElement, "click");
    component.triggerClose(true);
    expect(spy).toHaveBeenCalled();
  });


  it('should execute delete multiple monitor successfully', () => {
    component.selectedMonitors = new monitorsMock().collection.content;
    let spy = spyOn(monitorService, 'deleteMonitorPromise').and.returnValue(new Promise(resolve => { resolve(true) }));
    component.triggerConfirm();
    expect(spy).toHaveBeenCalledTimes(component.selectedMonitors.length);
  });

  it('should execute delete multiple monitor failed', () => {
    component.selectedMonitors = new monitorsMock().collection.content;
    let spy = spyOn(monitorService, 'deleteMonitorPromise').and.returnValue(new Promise(reject => { reject(new Error('Not found')) }));
    component.triggerConfirm();
    expect(spy).toHaveBeenCalledTimes(component.selectedMonitors.length);
  });

  it('should set values to execute the progress', () => {
    let obj = { id: "af21671b-2663-4035-810c-8eec9991ca4c", error: true };
    let count=0;
    component.progressBar(count, obj);
    console.log(component.selectedMonForDeletion);
    expect(component.selectedMonForDeletion).toEqual([obj]);
  });
});
