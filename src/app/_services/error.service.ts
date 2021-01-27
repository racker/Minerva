import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SalusError } from 'src/app/_models/salusError';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  transformSalusErrorHandler(error: HttpErrorResponse) {
    let salusError: SalusError = error.error;
    return throwError(salusError);
  }

  getClientErrorMessage(error: Error): string {
    return error.message ?
    this.errorMessage(error) :
      error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
      this.errorMessage(error) :
      'No Internet Connection';
  }

  getSalusErrorMessage(error: SalusError) {
    return this.errorMessage(error);
  }

  errorMessage(error):string{
    if(error.status){
      switch (true) {
        case error.status>=400 && error.status<500:
          return error;
        case error.status>=500 && error.status<600:
        return 'Internal server error.'
        default:
          return error.message;
      }
    }
    return error.message;
  }
}