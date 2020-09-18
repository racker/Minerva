import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ResourcesPage } from '../../../../../../../../../src/app/_features/resources/pages/resources/resources.page';

import { AdminResourceDetailsPage } from './admin-resource-details.page';
import { ResourcesListComponent } from '../../../../../../../../../src/app/_features/resources/components/list/resourceslist.component';
import { resourcesMock } from '../../../../../../../../../src/app/_mocks/resources/resources.service.mock';
import { SharedModule } from '../../../../../../../../../src/app/_shared/shared.module';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { of, Observable, throwError, Subscriber } from 'rxjs';
import { CreateResource, Resource, Resources } from 'src/app/_models/resources';
import { delay } from 'rxjs/operators';
import { By } from '@angular/platform-browser';



class ResourcesServiceMock {
  
  private _resources: Resources;
  private _resource: Resource;

  private mockedResources = new resourcesMock();
  get resources(): Resources {
    return this._resources;
  }

  set resources(value: Resources) {
    this._resources = value;
  }

  get resource(): Resource {
    return this._resource;
  }

  set resource(value: Resource) {
    this._resource = value;
  }

  /**
   * Gets a list of Resources
   * @param size
   * @param page
   * @returns Observable<Resources>
   */
  getResources(size?: number, page?: number): Observable<Resources> {
      let mocks = Object.assign({}, this.mockedResources.collection);
      let slicedData = [... mocks.content.slice(page * size, (page + 1) * size)];
      this.resources = mocks;
      this.resources.content = slicedData;
      return of<Resources>(this.resources).pipe(delay(500));
  }

  /**
   * Gets a single Resource
   * @param id
   * @returns Observable<Resource>
   */
  getResource(id: string): Observable<Resource> {
      this._resource = this.mockedResources.single;
      return of<Resource>(this.mockedResources.single).pipe(delay(500));
  }

  /**
   * @description Creates a resource with preliminary resource object
   * @param resource CreateResource
   * @returns Resource
   */
  createResource(resource:CreateResource): Observable<Resource> {
      this._resource = this.mockedResources.single;
      return of<Resource>(this.mockedResources.single);
  }

  /**
   * Updates a resource
   * @param id string
   * @param updatedData {[key: string]: any}
   * @returns Observable<Resource>
   */
  updateResource(id:string, updatedData: {[key: string]: any}): Observable<Resource> {
      this._resource = this.mockedResources.single
      return of<Resource>(this.mockedResources.single);
  }

  /**
   * @description Validates that the resourceId being created isn't alreay in use
   * by the tenant, as these must be unique on a per tenant basis
   * @param id string
   * @returns HttpResponse of empty object OR a boolean when in offline mode
    */
  validateResourceId(id:string): any {
      return throwError(new HttpErrorResponse({
        error: 'Not Found',
        status: 404
      }));
    
  }

  searchResources(search:string): Observable<Resources> {
      let mocks = Object.assign({}, this.mockedResources.collection);
      this.resources = mocks;
      let slicedData = [... mocks.content.slice(0 * 10, 1 * 10)];
      this.resources.content = slicedData;
      return of<Resources>(this.resources);
  }

  /**
   * @description
   * @param id string
   */
  deleteResource(id:string) {
      return of<boolean>(true);
  }
}


const routes = [
  {
    path: 'resources/:id',
    component: AdminResourceDetailsPage,
    data: {
      breadcrumb: ''
    }
  }
];

const keyPair = {
  keysandvalues: [
  {
    key: 'newkey',
    value: 'newpair'
  },
  {
    key: 'likelykey',
    value: 'likelypair'
  },
  {
    key: 'somekey',
    value: 'somepair'
  },
  {
    key: 'fourthkey',
    value: 'fourthpair'
  }
]};

const formattedKeyPair = {
  newkey: 'newpair',
  likelykey: 'likelypair',
  somekey: 'somepair',
  fourthkey: 'fourthpair'
}

describe('AdminResourceDetailsPage', () => {
  let injector: TestBed;
  let component: AdminResourceDetailsPage;
  let fixture: ComponentFixture<AdminResourceDetailsPage>;
  let resourceService: ResourcesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ResourcesListComponent,
        ResourcesPage,
        AdminResourceDetailsPage
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: "uniqueId"}),
            root: {
              routeConfig : routes[0]
            }
          }
        },
        ResourcesService
      ],
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {path:'resources',component:ResourcesPage}
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(AdminResourceDetailsPage,{
      set:{
        providers:[{
          provide: ResourcesService , useClass:ResourcesServiceMock
        }]
      }
    })
    fixture = TestBed.createComponent(AdminResourceDetailsPage);
    component = fixture.componentInstance;
    resourceService = fixture.debugElement.injector.get(ResourcesService);
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', async() => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.resource$).toBeDefined();
    expect(component.Object).toEqual(Object);
    expect(component.metaLoading).toEqual(false);
    expect(component.labelsLoading).toEqual(false);
    expect(component.deleteLoading).toEqual(false);
    expect(component.message).toEqual("Are you sure you'd like to delete this Resource?");
    // expect(component.metaPopPencil).toBeDefined();
    // expect(component.labelPopPencil).toBeDefined();
    // expect(component.delResource).toBeDefined();
    // expect(component.subManager).toBeDefined();
  });

  it('should have a route param', () => {
    expect(component.id).toEqual("uniqueId");
  });

  it('should update and format meta values', () => {
    component.metaValueUpdated(keyPair);
    expect(component.updatedMetaFields).toEqual(formattedKeyPair);
  });

  it('should finalize update of meta values finalizeMeta(), when metaform and label form not submited not valid', (done) => {

    let spy = spyOn(resourceService, 'updateResource')
    .and.returnValue(of(new resourcesMock().single));;
    resourceService.resource = new resourcesMock().single;
    component.metaFormSubmit.next(false);
    component.labelFormSubmit.next(false);
    component.metaValueUpdated(keyPair);
    component.finalizeMeta();
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should finalize update of meta values finalizeMeta(), when metaform and label for valid submited valid', (done) => {

    let spy = spyOn(resourceService, 'updateResource')
    .and.returnValue(of(new resourcesMock().single));;
    resourceService.resource = new resourcesMock().single;
    component.metaFormSubmit.next(true);
    component.labelFormSubmit.next(true)
    component.metaValueUpdated(keyPair);
    component.finalizeMeta();
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should update & format label values', () => {
    component.labelsUpdated(keyPair);
    expect(component.updatedLabelFields).toEqual(formattedKeyPair);
  });

  it('should finalize update of label values finalizeLabels()', (done) => {
    let spy = spyOn(resourceService, 'updateResource').and.returnValue(of(new resourcesMock().single));
    resourceService.resource = new resourcesMock().single;
    component.labelsUpdated(keyPair);
    component.finalizeLabels();
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should set to a single resource', (done) => {
    let mocked = new resourcesMock().single;
    component.resource$.subscribe((resource) => {
      expect(resource).toEqual(mocked);
      done();
    });
  });

  it('should delete a resource', (done) => {
    let spy = spyOn(resourceService, 'deleteResource').and.returnValue(of(true));
    component.triggerConfirm('resourceToDelete');
    expect(spy).toHaveBeenCalled();
    done();
  })
  it('when fail to delete a resource', (done) => {
    let spy = spyOn(resourceService, 'deleteResource').and.returnValue(throwError({status: 404}));
    component.delResourcePop=fixture.debugElement.query(By.css('.nodisplaClick'));
    component.delResource= fixture.debugElement.query(By.css('#delResLink'));
    
    component.triggerConfirm('resourceToDelete');
    expect(spy).toHaveBeenCalled();
    done();
  })

});
