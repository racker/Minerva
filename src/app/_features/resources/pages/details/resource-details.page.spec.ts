import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ResourcesPage } from '../resources/resources.page';
import { ResourceDetailsPage } from './resource-details.page';
import { ResourcesListComponent } from '../../components/list/resourceslist.component';
import { resourcesMock } from '../../../../_mocks/resources/resources.service.mock';
import { SharedModule } from '../../../../_shared/shared.module';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { of, Observable } from 'rxjs';

const routes = [
  {
    path: 'resources',
    data: {
      breadcrumb: 'RESOURCES'
    },
    children: [{
      path: '',
      component: ResourcesPage,
      data: {
        breadcrumb: ''
      }
    },
    {
      path: ':id',
      component: ResourceDetailsPage,
      data: {
        breadcrumb: 'DETAILS'
      }
    }]
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

describe('ResourceDetailsPage', () => {
  let injector: TestBed;
  let component: ResourceDetailsPage;
  let fixture: ComponentFixture<ResourceDetailsPage>;
  let resourceService: ResourcesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        ResourcesListComponent,
        ResourcesPage,
        ResourceDetailsPage
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
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(ResourceDetailsPage);
    component = fixture.componentInstance;
    resourceService = injector.get(ResourcesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.resource$).toBeDefined();
    expect(component.Object).toEqual(Object);
    expect(component.metaLoading).toEqual(false);
    expect(component.labelsLoading).toEqual(false);
    expect(component.deleteLoading).toEqual(false);
    expect(component.metaPopPencil).toBeDefined();
    expect(component.labelPopPencil).toBeDefined();
    expect(component.delResource).toBeDefined();
    expect(component.subManager).toBeDefined();
  });

  it('should have a route param', () => {
    expect(component.id).toEqual("uniqueId");
  });

  it('should update and format meta values', () => {
    component.metaValueUpdated(keyPair);
    expect(component.updatedMetaFields).toEqual(formattedKeyPair);
  });

  it('should finalize update of meta values finalizeMeta()', (done) => {

    let spy = spyOn(resourceService, 'updateResource')
    .and.returnValue(of(new resourcesMock().single));;
    resourceService.resource = new resourcesMock().single;
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

  it('should set to a single resource', () => {
    let mocked = new resourcesMock().single;
    component.resource$.subscribe((resource) => {
      expect(resource).toEqual(mocked);
    });
  });

  it('should delete a resource', (done) => {
    let spy = spyOn(resourceService, 'deleteResource').and.returnValue(of());
    component.deleteResource('resourceToDelete');
    expect(spy).toHaveBeenCalled();
    done();
  })
});
