import { Injectable } from '@angular/core';
import { LogLevels } from '../../_enums/log-levels.enum';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SalusError } from 'src/app/_shared/salusApiError';

@Injectable({
  providedIn: 'root'
})

/**
 * @name LoggingService
 * @description
 * A service for logging messages to the console. There are multiple log levels.
 * They are, in order:
 * 0. debug
 * 1. info
 * 2. warning
 * 3. error
 *
 * This uses local storage to keep track of the current log level.
 * To change the log level, so that you may see different levels of messages,
 * simply alter the LOG_LEVEL value in local storage using browser dev tools.
 */
export class LoggingService {

  logLevel = null;
  logLevels = LogLevels;
  localStorage: LocalStorage;
  private alrtResponse:BehaviorSubject<string | undefined> = new BehaviorSubject(undefined);

  constructor() {
    this.logLevel = localStorage.getItem('LOG_LEVEL');
  }


  /**
   * @description Get Latest occurence of Error
   */
  getAlertMsg(): Observable<string> {
    return this.alrtResponse.asObservable();
  }

   public setAlertMsg(data:string){
    this.alrtResponse.next(data);
  }

  /**
   * @name LoggingService.setLevel
   * @param {LogLevels} logLevel Enum of the different log levels
   * @description
   * Sets the log level in local storage
   * @example
   * var loggingService = new LoggingService();
   * // Use either an int
   * loggingService.setLevel(1);
   * // Or you can use the enum
   * loggingService.setLeve(LogLevels.info);
   */
  setLevel(logLevel: LogLevels) {
    this.logLevel = logLevel;
    localStorage.setItem('LOG_LEVEL', logLevel.toString())
  }
    /**
   * @name LoggingService.getLevel
   * @description
   * Gets the current level set in local storage
   * @example
   * var loggingService = new LoggingService();
   * loggingService.getLevel();
   */
  getLevel() {
    return localStorage.getItem('LOG_LEVEL');
  }

  /**
   * @name LoggingService.log
   * @description
   * Logs a message to the console based on log level. The important thing to note here
   * is that messages will only be logged to a specific, specified, level.  If the set level is
   * greater than the level of the message it will not show up in the console.
   * @param {any} message object that will represent the message of the log
   * @param {LogLevels} logLevel the level at which you would like the message to be logged to
   * @example
   * var loggingService = new LoggingService();
   * // Sending a string
   * loggingService.log('A message to the console', LogLevels.info);
   * // Sending an object
   * LoggingService.log({ message: 'some message': data: someDataObj }, LogLevels.info);
   */
  log(message: any, logLevel: LogLevels): void {
    var level = this.logLevel;
    if (logLevel >= parseInt(level)){
      if(parseInt(level) === LogLevels.error){
        this.setAlertMsg(message);
      }
      console.log({ level: LogLevels[logLevel], message: message });
    }
  }

  /**
   * @name handleError
   * @param error 
   * @description this function calls when any exception comes from salus api to show the trace id and exception in the logs
   * 
   */
  handleError(error: SalusError){
    console.log({ level: LogLevels.info, error: error.error });
    return throwError(error);
    } 


}
