import { TestBed, getTestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';

describe('LoggingService', () => {
  let injector: TestBed;
  let service: LoggingService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = getTestBed();
    service = injector.get(LoggingService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the log level', () => {
    service.setLevel(0);
    expect(localStorage.getItem('LOG_LEVEL')).toEqual('0');
  });

  it('should get the log level', () => {
    service.setLevel(LogLevels.error);
    var level = service.getLevel();
    expect(level).toEqual('3');
  });

  it('should log a Error message to the console and set Alert message', () => {
    service.logLevel = 3;
    var consoleSpy = spyOn(console, 'log');
    service.log('error', 3);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('Set Alert message', () => {
    service.getAlertMsg().subscribe(mes => {
      expect(mes).toBe(undefined);
    });
  });

  it('should return subscribe message', () => {
    service.setLevel(3);
    service.log('silly message', 3);
    service.getAlertMsg().subscribe(mes => {
      expect(mes).toBe('silly message');
    });
  });

});
