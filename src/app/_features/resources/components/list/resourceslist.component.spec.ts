import { async, ComponentFixture, TestBed, getTestBed, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ResourcesListComponent } from './resourceslist.component';
import { ResourcesPage } from '../../pages/resources/resources.page';
import { ResourceDetailsPage } from '../../pages/details/resource-details.page';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock'
import { Resource } from 'src/app/_models/resources';
import { default as resourceMockCollection } from 'src/app/_mocks/resources/collection.json';
import { Resources } from 'src/app/_models/resources.js';
import { ValidateResource } from '../../../../_shared/validators/resourceName.validator';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PaginationComponent } from 'src/app/_shared/components/pagination/pagination.component';
import { SpinnerService } from 'src/app/_services/spinner/spinner.service';
import { mockResourcesProvider } from 'src/app/_interceptors/request.interceptor';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { LoggingService } from 'src/app/_services/logging/logging.service';


var mockResource: Resource = {
  "resourceId": "development:1",
  "labels": {
    "agent_discovered_arch": "MS90HCG8WL",
    "agent_discovered_os": "darwin",
    "agent_discovered_hostname": "localdev",
    "pingable": "true",
    "agent.discovered.arch": "amd64"
  },
  "metadata": {
    "ping_ip": "127.0.0.1"
  },
  "tenantId": "833544",
  "presenceMonitoringEnabled": true,
  "associatedWithEnvoy": false,
  "checked":false,
  "createdTimestamp": new Date(),
  "updatedTimestamp": new Date()
};

describe('ResourcesListComponent', () => {
  let injector: TestBed;
  let component: ResourcesListComponent;
  let fixture: ComponentFixture<ResourcesListComponent>;
  let validateResource: ValidateResource;
  let resourceService: ResourcesService;
  let spinnerService: SpinnerService;
  let router: Router;
  let env: EnvironmentConfig;
  let logService: LoggingService;


  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ResourcesListComponent, ResourcesPage, ResourceDetailsPage, PaginationComponent ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'resources/development:0', component: ResourceDetailsPage}]
        ),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        ResourcesService,
        SpinnerService,
        ValidateResource,
        EnvironmentConfig,
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        },
        // reference the new instance of formBuilder from above
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        mockResourcesProvider
      ]
    })
    .compileComponents();
    injector = getTestBed();
    fixture = TestBed.createComponent(ResourcesListComponent);
    component = fixture.componentInstance;
    resourceService = TestBed.inject(ResourcesService);
    validateResource = TestBed.inject(ValidateResource);
    spinnerService = TestBed.inject(SpinnerService);
    env = TestBed.inject(EnvironmentConfig);
    logService      = injector.inject(LoggingService);
    env.loadEnvironment();
    router = injector.inject(Router);
    component.addResourceForm = formBuilder.group({
      name: ['', Validators.required],
      enabled: ''
    });

    fixture.detectChanges();
  }));

  const updateForm = (resourceId: string, enabledPresence: boolean) => {
    component.addResourceForm.controls['name'].setValue(resourceId);
    component.addResourceForm.controls['enabled'].setValue(enabledPresence);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it ('should have defaults', () => {
        expect(component.searchPlaceholderText).toBeDefined();
        expect(component.modalType).toEqual('delResourceModal');
        expect(component.message).toEqual('Are you sure you want to delete selected resource?');
        expect(component.confirmMessageSuccess).toEqual('');
        expect(component.confirmMessageError).toEqual('');
        expect(component.resources).toBeDefined();
        expect(component.total).toBeDefined();
        expect(component.addButton).toBeDefined();
        expect(component.failedResources).toEqual([]);
        expect(component.page).toEqual(0);
        expect(component.progressVal).toEqual(0);
        expect(component.defaultVal).toEqual(20);
        expect(component.successCount).toEqual(0);
        expect(component.defaultAmount).toBeDefined();
        expect(component.addResLoading).toEqual(false);
        expect(component.disableOk).toEqual(true);
        expect(component.selectedResources).toEqual([]);
        expect(component.selectedResForDeletion).toEqual([]);
        expect(component.resourceArr).toEqual([]);
        expect(component.addResourceForm).toBeDefined();
    });

    it('ngOnInit should resolve resources', async() => {
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.resources).toEqual(new resourcesMock().collection.content
        .slice(0 * env.pagination.resources.pageSize, 1 * env.pagination.resources.pageSize));
    });

    it('should assign total amount of resources', async() => {
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.total).toEqual(54);
    });

    it('should assign current page', () => {
      expect(component.page).toEqual(0);
    });

    it('should create correct placeholder text', async() => {
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.searchPlaceholderText).toEqual('Search 54 Resources');
    });


  it('should add all resources', async() => {
    fixture.detectChanges();
      await fixture.whenStable();

    var checked = { target:{checked:true} };
    component.checkColumn(checked);
    component.selectedResources.forEach(e => {
      e.checked = true;
    });

    expect(component.resources)
    .toEqual(component.selectedResources);

  });

  it('should remove all resources', async() => {
    fixture.detectChanges();
      await fixture.whenStable();

    var unchecked = { target:{checked:false} };
    component.checkColumn(unchecked);
    expect(component.selectedResources).toEqual([]);
  });

  it('should select a resource', () => {
    component.selectResource(mockResource);
    expect(component.selectedResources[0]).toEqual(mockResource);
  });

  it('should remove a selected resource', () => {
    component.selectResource(mockResource);
    component.selectResource(mockResource);
    expect(component.checkExist(component.selectedResources, mockResource.resourceId)).toEqual(false);
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
    component.goToPage(3);
    component.prevPage();
    expect(component.page).toEqual(2);
  });

  it('should set loading back to false after form submission', (done) => {
    expect(component.addResLoading).toBe(false);
    updateForm('newcool-server', false);
    fixture.ngZone.run(() => {
      component.addResource(component.addResourceForm);
      setTimeout(function() {
        expect(component.addResLoading).toBe(false);
        done();
      }, 2000);
    });
  });

  it('should error form when resourceId is empty', () => {
    updateForm('', false);
    component.addResource(component.addResourceForm);
    expect(component.addResourceForm.invalid).toBe(true);
  });


  xit('should add Resource and navigate to details page', (done) => {
    const spy = spyOn(router, 'navigate');
    spyOn(validateResource,'valid').and.returnValue(of({status:404}));
    fixture.ngZone.run(() => {
      updateForm('newcool-server', false);
      component.addResource(component.addResourceForm);
      setTimeout(function() {
        expect(spy).toHaveBeenCalled();
        done();
      }, 2000);
    });
  });

  xit('should add Resource and trigger services', (done) => {
    const spy = spyOn(resourceService, 'createResource').and.returnValue({subscribe: () => { } });
    spyOn(validateResource,'valid').and.returnValue(of({status:404}));
    fixture.ngZone.run(() => {
      updateForm('newcool-server', false);
      component.addResource(component.addResourceForm);
      setTimeout(function() {
        expect(spy).toHaveBeenCalled();
        done();
      }, 2000);
    });
  });

it('should reset results when search dismissed', () => {
  const spliceContent=new resourcesMock().collection;
  spliceContent.content.splice(0 * env.pagination.resources.pageSize, 1 * env.pagination.resources.pageSize)
  const spy = spyOnProperty(resourceService, 'resources', 'get').and.returnValue(spliceContent);
  component.resources=null;
  component.total = null;
  component.resetSearch();
  expect(component.resources).toEqual(spliceContent.content);
  expect(component.total).toEqual(54);
});

it('should display loading spinner', () => {
  let spy = spyOn(spinnerService, 'changeLoadingStatus');
  component.resourcesSearch(true);
  expect(spy).toHaveBeenCalled();
});

it('should destroy subscriptions', (done) => {
    spyOn(validateResource, 'valid').and.returnValue(of({}));
    const spy1 = spyOn(component['ngUnsubscribe'], 'next').and.returnValue({ subscribe: () => { } });
    const spy2 = spyOn(component['ngUnsubscribe'], 'complete').and.returnValue({ subscribe: () => { } })
    component.ngOnDestroy();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    done();
  });

  it('should listen for triggerOk', () => {
    component.triggerOk();
    expect(component.confirmResource.nativeElement.getAttribute('close')).toBe('true');
    expect(component.confirmResource.nativeElement.getAttribute('open')).toBeNull;
  });

  it('should listen for triggerClose', () => {
    let spy =  spyOn(component.delResource.nativeElement, "click");
    component.triggerClose(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should execute delete multiple resources succesfully', () => {
    component.selectedResources = new resourcesMock().test.content;
    let spy = spyOn(resourceService, 'deleteResourcePromise').and.returnValue(new Promise(resolve => { resolve(true)}));
    component.triggerConfirm();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should execute delete multiple resources failed', () => {
    component.selectedResources =  new resourcesMock().test.content;
    let spy = spyOn(resourceService, 'deleteResourcePromise').and.returnValue(new Promise(reject => { reject(new Error('Not found'))}));
    component.triggerConfirm();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should execute progress bar for success', () => {
    let obj = [{id:"test-1", error: true}];
    let count = 0;
    count++;
    component.progressBar(count, obj);
    expect(component.selectedResForDeletion).toEqual([obj]);
  });

  it('should execute progress bar for failure', () => {
    let obj = {id:"test-2", error: false};
    let count = 0;
    count++;
    component.progressBar(count, obj);
    expect(component.selectedResForDeletion).toEqual([obj]);
  });

  it('should execute reset for checked flag to false', () => {
    let checked = false;
    component.resources = new resourcesMock().collection.content;
    component.resources.forEach(element => {
        element['checked'] = false;
    });
    component.reset();
    component.resources.forEach(e => {
      expect(e.checked).toBe(checked);
    });

  });

  it('should execute reset for checked flag to true', () => {
    let checked = false;
    component.resources = new resourcesMock().collection.content;
    component.resources.forEach(element => {
        element['checked'] = true;
    });
    component.reset();
    component.resources.forEach(e => {
      expect(e.checked).toBe(checked);
    });

  });

  it('should check failedResources array', () => {
    component.failedResources = ["test-1", "test-2"];
    let spy = spyOn(logService, 'log');
    component.triggerOk();
    expect(spy).toHaveBeenCalled();
  });

  /*it('should check sorting resources desc', () => {
      component.sortResources('desc', 'resourceId');
      expect(component.sorting).toBe('resourceId,desc');
  });*/

});
