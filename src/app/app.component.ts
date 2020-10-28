import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoggingService } from './_services/logging/logging.service';
import { SpinnerService } from './_services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit  {
  message: string = undefined;
  isLoading: boolean;
  constructor(private lgService:LoggingService,
     private changeDetector: ChangeDetectorRef, private spnService:SpinnerService){

     }

  ngOnInit() {
    this.subscribeError();
    this.spnService.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }
  private subscribeError(){
    this.lgService.getAlertMsg().subscribe(msg =>{
      this.message=msg;
      this.changeDetector.detectChanges();
    })
  }
  alertDismiss(){
    this.lgService.setAlertMsg("");
  }
 }
