import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

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