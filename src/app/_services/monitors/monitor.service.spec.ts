import { TestBed, getTestBed } from '@angular/core/testing';
import { MonitorService } from './monitor.service';
import { monitorsMock } from '../../_mocks/monitors/monitors.service.mock';
import { CreateMonitor } from 'src/app/_models/salus.monitor';
import { Monitor } from 'src/app/_models/monitors';
import { CreateTestMonitor } from 'src/app/_features/monitors/interfaces/testMonitor.interface';
import { mockResourcesProvider } from 'src/app/_interceptors/request.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';

describe('MonitorService', () => {
  let injector: TestBed;
  let service: MonitorService;
  let newMonitor: CreateMonitor;
  let env: EnvironmentConfig;

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
        HttpClientTestingModule
      ],
      providers: [
        MonitorService,
        mockResourcesProvider,
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        }
      ]
    });
    injector = getTestBed();
    service = injector.inject(MonitorService);
    env = injector.inject(EnvironmentConfig);
    env.loadEnvironment();
});

afterEach(() => {
  TestBed.resetTestingModule();
})
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get Monitors', () => {
    service.monitors = new monitorsMock().collection;
    expect(service.monitors.content.length).toBeGreaterThan(0);
  });

  it('should set & get single Monitor', () => {
    service.monitor = new monitorsMock().single;
    expect(service.monitor.id).toEqual("23ONM715")
  });


    it('should return collection', (done) => {
      service.getMonitors(env.pagination.pageSize, 0).subscribe((data) => {
        let mocked = new monitorsMock().collection;
        let slicedArray = new monitorsMock().collection.content
         .slice(0 * env.pagination.pageSize, 1 * env.pagination.pageSize);
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

    xit('should delete a Monitor', (done) => {
      service.deleteMonitor('monitorID87723').subscribe((data) => {
        expect(data.body).toEqual(true);
        done();
      })
    });

    it('should create a monitor', (done) => {
      service.createMonitor(newMonitor).subscribe(data => {
        expect(data).toEqual(new monitorsMock().single);
        done();
      });
    });
    it('should get bound monitors', (done) => {
      service.getBoundMonitor({monitorId : ""}).subscribe(data => {
        expect(data.content[0].monitorId).toEqual(new monitorsMock().boundMonitor.content[0].monitorId);
        done();
      });
    });
   
    it('should update monitors', async() => {
      let monid = new monitorsMock().single.id;
      let updatedFields = { labelSelector: {'newkey': 'newVal', 'somekey':'someVal'}};
      await service.updateMonitor(monid, updatedFields).subscribe((data:Monitor) => {
        expect(data).toEqual(new monitorsMock().single);
      });
    });

    xit('should return test monitor results', (done) => {
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
        done();
      });
    });

    it('should delete a multiple Monitors', async() => {
      let resp = await service.deleteMonitorPromise('test-1');
       expect(resp).toBe(true);
    });


});
