import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, ActivatedRoute, Route } from '@angular/router';
import { FeatureFlag } from './feature-flag.guard';
import { AppRoutingModule } from '../app.routing';

class MockActivatedRouteSnapshot {
    private _data: any;
    get data(){
       return this._data;
    }
  }

  const routes = [
   { 
    path: 'resources', 
    loadChildren: () => import('../_features/resources/resources.module').then(m => m.ResourcesModule),
    data: {
      featureFlag: 'resources'
    }
  }
];

let mockRouterStateSnapshot : RouterStateSnapshot;

describe('FeatureFlag', () => {
  let featureFlag: FeatureFlag;
   let router: Router;
  let authService;
  let mockRouter: any;  

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        FeatureFlag
      ]
    });
    featureFlag = TestBed.get(FeatureFlag);
    router = TestBed.get(Router);

  });


  it('should be created', () => {
    featureFlag = new FeatureFlag(mockRouter);
    expect(featureFlag).toBeTruthy();
  });
});