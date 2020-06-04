import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './auth/auth-gaurd.service';

const providers = [AuthGuardService]

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [       
    AppRoutingModule   
  ],
  providers: providers,
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

@NgModule({})
export class AdminAppModule{
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers:providers,      
    }
  }
}
