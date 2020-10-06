import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MonitorService } from './monitor.service';
import { environment } from '../../../environments/environment';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock';
import { CreateMonitor } from 'src/app/_models/salus.monitor';
import { CreateTestMonitor } from 'src/app/_features/monitors/interfaces/testMonitor.interface';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('MonitorService', () => {
  let injector: TestBed;
  let service: MonitorService;
  let newMonitor: CreateMonitor;

  beforeEach(() => {
    newMonitor = {
      name: 'Tight Monitor',
      labelSelector: {
          agent_discovered_os: 'linux',
          agent_hostname: 'mranderson'
      },
      labelSelectorMethod: 'AND',
      resourceId: '45544',
      excludedResourceIds: ['8774736', '6355266'],
      interval: '60'

    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        MonitorService
      ]
    });
    injector = getTestBed();
    service = injector.get(MonitorService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get Monitors', () => {
    service.monitors = new monitorsMock().collection;
    expect(service.monitors.content[0].id).toEqual("889EJ382");
  });

  it('should set & get single Monitor', () => {
    service.monitor = new monitorsMock().single;
    expect(service.monitor.id).toEqual("23ONM715")
  });

  describe('CRUD Operations', () => {
    it('should return collection', (done) => {
      service.getMonitors(environment.pagination.pageSize, 0).subscribe((data) => {
        let mocked = new monitorsMock().collection;
        let slicedArray = new monitorsMock().collection.content
         .slice(0 * environment.pagination.pageSize, 1 * environment.pagination.pageSize);
        mocked.content = slicedArray
        expect(data).toEqual(mocked);
        done();
      });
    });

    it('should return single monitor', (done) => {

      service.getMonitor("76kn92Mnnas-87mbVwq").subscribe((data) => {
        expect(data).toEqual(new monitorsMock().single);
        done();
      });
    });

    it('should delete a Monitor', () => {
      service.deleteMonitor('monitorID87723').subscribe((data) => {
        expect(data).toEqual(true);
      })
    });

    it('should create a monitor', () => {
      service.createMonitor(newMonitor).subscribe(data => {
        expect(data).toEqual(new monitorsMock().single);
      });
    });
    it('should get bound monitors', () => {
      service.getBoundMonitor({monitorId : ""}).subscribe(data => {
        expect(data.content[0].monitorId).toEqual(new monitorsMock().boundMonitor.content[0].monitorId);
      });
    });
    it('should update monitors', () => {
      let monid = new monitorsMock().single.id
      service.updateMonitor(monid,[]).subscribe(data => {
        expect(data.id).toEqual(monid);
      });
    });

    it('should return test monitor results', () => {
      let monitorData: CreateTestMonitor = {
        resourceId: 'testMonitor',
        details: {
          type: 'local',
          plugin: {
            type: 'cpu'
          }
        }
      };

      service.monitorTest(monitorData).subscribe(data => {
        expect(data).toEqual(new monitorsMock().testMonitor);
      });
    });

    it('should delete a multiple Monitors', async() => {
      let resp = await service.deleteMonitorPromise('test-1');
       expect(resp).toBe(true); 
    });

  });
});
