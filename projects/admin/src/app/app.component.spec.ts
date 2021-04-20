import { TestBed, async, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PortalDataService } from 'src/app/_services/portal/portal-data.service';
import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
describe('AppComponent', () => {
  let injector: TestBed;
  let component: AppComponent;

  let impersonationService : ImpersonationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[{provide:PortalDataService}, {provide:TokenService}]
    }).compileComponents();
    injector = getTestBed();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    impersonationService = injector.inject(ImpersonationService);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'admin'`, () => {
    expect(component.title).toEqual('admin');
  });

  it('should have been called impersonation request', () => {
    component.data = {
      "RAX-AUTH:impersonation" : {
        user : {
          username : 'walterwhite'
        }
      }
    }
    component.raxToken = 'AADU-8A-3pi8q4BIWfX2snQdcWEHye';
    let spy = spyOn(impersonationService, 'getImpersonationToken').and.returnValue({ subscribe: () => {} })
    component.searchTenant();
    expect(spy).toHaveBeenCalled();
  })
});
