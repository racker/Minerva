import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isLoading asObservable', () => {
    service.isLoading.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('changeLoadingStatus() should emit boolean value to loadingSource subject as false', (done) => {
    const flag = false;
    service.changeLoadingStatus(flag);
    service.isLoading.subscribe((value) => {
        expect(value).toBe(flag);
        done();
      })
  });

  it('changeLoadingStatus() should emit boolean value to loadingSource subject as true', (done) => {
    const flag = true;
    service.changeLoadingStatus(flag);
    service.isLoading.subscribe((value) => {
      expect(value).toBe(flag);
      done();
    });
  });



});
