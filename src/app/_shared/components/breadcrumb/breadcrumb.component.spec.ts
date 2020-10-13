import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA,  Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourcesPage } from '../../../_features/resources/pages/resources/resources.page';
import { ResourceDetailsPage } from '../../../_features/resources/pages/details/resource-details.page';
import { BreadcrumbComponent } from './breadcrumb.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const routes = [
  { path: 'resources',
    data: {
      breadcrumb: 'RESOURCES'
    },
    children: [{
      path: '',
      component: ResourcesPage,
      data: {
        breadcrumb: 'RESOURCES'
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

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ BreadcrumbComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            root: {
              routeConfig : routes[0]
            }
          }
        }
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(BreadcrumbComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  afterEach(() => {
    TestBed.resetTestingModule();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ability to input routeDetails', () => {
    var checkType = typeof component.routeDetails;
    expect(checkType).toEqual("string");
    expect(component.routeDetails).toEqual("");
  });

  it('should have breadcrumb method', () => {
    expect(component.buildBreadCrumb).toBeTruthy();
  });

  it('should build Breadcrumbs', () => {
    const completedCrumbs = [{"label":"RESOURCES","url":"/resources/"}];
    expect(component.breadcrumbs).toEqual(completedCrumbs);
  });

});
