import { async, TestBed, getTestBed } from '@angular/core/testing';
import { ValidateResource } from './resourceName.validator'
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { HttpClientModule } from '@angular/common/http';
import { mockResourcesProvider } from 'src/app/_interceptors/request.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('invalidResourceName', () => {
    let injector: TestBed;
    let resourceService: ResourcesService;
    let validateResource: ValidateResource;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ResourcesService,
                mockResourcesProvider
            ]
        });
        injector = getTestBed();
        validateResource = injector.get(ValidateResource);
        resourceService = injector.get(ResourcesService);
    }));
    afterEach(() => {
        TestBed.resetTestingModule();
      })
    it('should create validator', () => {
        expect(validateResource).toBeTruthy();
    });

    it('should validate resource ID', () => {
        let spy = spyOn(resourceService, 'validateResourceId');
        validateResource.valid('newcool-server');
        expect(spy).toHaveBeenCalled();
    });

});