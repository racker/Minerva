import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FeatureFlag } from './feature-flag.guard';

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

describe('FeatureFlag', () => {
  let featureFlag: FeatureFlag;
  let router: Router;
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