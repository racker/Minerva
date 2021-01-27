import { TestBed, getTestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SalusError } from 'src/app/_models/salusError';

describe('ErrorService', () => {
  let injector: TestBed;
  let service: ErrorService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = getTestBed();
    service = injector.get(ErrorService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute transformSalusErrorHandler', (done) => {
    //TODO: Add tests for transformSalusErrorHandler
    const salusErr: SalusError = {
      timestamp: 'xxx-xx-x-x',
      app: 'salus.app.k8',
      host: 'hostname.stuff.url',
      message: 'it done broke',
      errors: [],
      traceId: '8xj89-2km38'
    };

    const errorReq = new HttpErrorResponse({
      error: salusErr,
      status: 400,
      statusText: "Bad Request",
      url: "http://wiki.stuff/something",
    });

    service.transformSalusErrorHandler(errorReq)
      .subscribe((resp:any) => {
      },(err) => {
        expect(err.message).toEqual(errorReq.error.message);
        done();
      });
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

  it('should execute getSalusErrorMessage and return throwerror', () => {
    const error: SalusError = {
      timestamp: 'xxx-xx-x-x',
      app: 'salus.app.k8',
      host: 'hostname.stuff.url',
      message: 'it done broke',
      errors: [],
      traceId: '8xj89-2km38'
    };
    expect(service.getSalusErrorMessage(error)).toEqual(
      'it done broke'
    );
  });

});
