import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesService } from './resources.service';
import { resourcesMock } from '../../_mocks/resources/resources.service.mock';
import { Resource, CreateResource } from 'src/app/_models/resources';
import { mockResourcesProvider } from 'src/app/_interceptors/request.interceptor';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';

describe('ResourcesService', () => {
  let injector: TestBed;
  let service: ResourcesService;
  let env: EnvironmentConfig;
  let createResource: CreateResource = {
    resourceId: 'newcool-server',
    presenceMonitoringEnabled: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ResourcesService,
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
    env= injector.inject(EnvironmentConfig);
    service = TestBed.inject(ResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get resources', () => {
    service.resources = {
      content: [],
      totalPages: 3,
      totalElements: 6,
      last: true,
      first: true,
      number: 0
    };
    expect(service.resources.last).toEqual(true);
  });


  describe('CRUD Operations', () => {
    it('should return collection', (done) => {
      service.getResources(env.pagination.resources.pageSize, 0).subscribe((data) => {
        let mocked = new resourcesMock().collection;
        let slicedArray = new resourcesMock().collection.content
         .slice(0 * env.pagination.resources.pageSize, 1 * env.pagination.resources.pageSize);
        mocked.content = slicedArray;
        expect(data).toEqual(mocked);
        done();
      });
    });

    it('should return single resource', (done) => {
      service.getResource("linuxResource").subscribe((data) => {
        expect(data).toEqual(new resourcesMock().single);
        done();
      });
    });

    it('should create a resource', (done) => {
      service.createResource(createResource).subscribe((data) => {
        expect(data).toEqual(new resourcesMock().single);
        done();
      })
    });

    it('should validate a resource ID', (done) => {
      service.validateResourceId('newcool-server').subscribe((res) => {
        expect(res.status).toEqual(201);
        done();
      });
    });

    it('should update a single resource metadata or labels', (done) => {
      let updated = {labels: {'newkey': 'newVal', 'somekey':'someVal'}};
      service.updateResource("linuxResource", updated).subscribe((data:Resource) => {
        expect(data).toEqual(new resourcesMock().single);
        done();
      });
    });

    it('should search for resources', (done) => {
      let q = 'coo'
      service.searchResources(q).subscribe((data) => {
        expect(data.content.length).toBeGreaterThan(2);
        done();
      });
    });

    it('should delete a Resource', (done) => {
      service.deleteResource('resourceID').subscribe((data) => {
        expect(data).toEqual(true);
        done();
      });
    });

    it('should delete a multiple Resource', async() => {
      let resp = await service.deleteResourcePromise('test-1');
       expect(resp).toBe(true); 
    });
  });
});
