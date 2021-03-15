import {Location} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
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
  let location: Location;
  let injector: TestBed;
  

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

    injector = getTestBed();
    featureFlag = injector.inject(FeatureFlag);
    router = injector.inject(Router);
    location = injector.inject(Location);

  });

  it('should be created', () => {
    featureFlag = new FeatureFlag(mockRouter);
    expect(featureFlag).toBeTruthy();
  });

  it('if resource flag is false, user not able to load module', () => {
    router.navigateByUrl('resources');
    expect(location.path()).toBe('');
  }); 
});