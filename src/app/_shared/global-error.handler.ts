import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '../_services/logging/logging.service';
import { ErrorService } from '../_services/error.service';
import { LogLevels } from '../_enums/log-levels.enum';
import { implementsObject } from '../_shared/utils';
import { SalusError } from '../_models/salusError';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse | SalusError): void {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);

    let message;
    if (error instanceof HttpErrorResponse) {
      // General server error
      message = errorService.getServerErrorMessage(error);

    } else if(implementsObject<SalusError>(error, ['traceId', 'app', 'host'])) {
      // Salus API error
      message = errorService.getSalusErrorMessage(<SalusError>error);
    }

    else {
      // Client Error
      message = errorService.getClientErrorMessage(<Error>error);
    }

    // Always log errors
    logger.log(message, LogLevels.error);
  }
}