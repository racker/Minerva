import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let component: MonitorslistComponent;
  let fixture: ComponentFixture<MonitorslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MonitorslistComponent, MonitorsPage, PaginationComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        MonitorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorslistComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setup defaults', () => {
    /*it('ngOnInit should resolve monitors', () => {
      fixture.detectChanges();
        expect(component.monitors).toEqual(new monitorsMock().collection.content
        .slice(0 * environment.pagination.monitors.pageSize, 1 * environment.pagination.monitors.pageSize));
    });*/

    /*it('should assign total amount of monitors', () => {
      expect(component.total).toEqual(30);
    });*/

    it('should assign current page', () => {
      expect(component.page).toEqual(0);
    });

    /*it('should create correct placeholder text', () => {
      expect(component.monitorSearchPlaceholderText).toEqual('Search 30 monitors');
    });*/

    it('should add MonUtil to project', () => {
      expect(component.monitorUtil).toEqual(MonitorUtil);
    });
  });

  /*it('should add all monitors', () => {
    var checked = { target:{checked:true} };
    component.checkColumn(checked);
    component.selectedMonitors.forEach(e => {
      e.checked = true;
    });

    expect(component.monitors)
    .toEqual(component.selectedMonitors);

  });*/

  /*it('should remove all monitors', () => {
    var unchecked = { target:{checked:false} };
    component.checkColumn(unchecked);
    expect(component.selectedMonitors).toEqual([]);
  });*/

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
});
