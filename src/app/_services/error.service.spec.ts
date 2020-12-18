import { TestBed, getTestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorService', () => {
   let injector: TestBed;
   let service:ErrorService;
   beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = getTestBed();
    service = injector.get(ErrorService);

  });

  it('should be created', () => {    
    expect(service).toBeTruthy();
  });

  it('should execute getClientErrorService', () => {
    const error = new Error('basic Error');
    expect(service.getClientErrorMessage(error)).toEqual('basic Error');
  });

  it('Should execute getServerErrorMessage with status 500', () => {
        const error = new HttpErrorResponse({
        error: 'server Error',
        status: 500,
        statusText: 'bad status',
        url: 'http://wiki.stuff/something'
    });
    expect(service.getServerErrorMessage(error)).toEqual(
        'Internal server error.'
    );
  });
  it('should execute getServerErrorMessage with status', () => {
        const error = new HttpErrorResponse({
        error: 'server Error',
        status: 404,
        statusText: 'bad status',
        url: 'http://wiki.stuff/something'
    });
    expect(service.getServerErrorMessage(error)).toEqual(
        'The server can not find the requested resource.'
    );
  });
  
});
