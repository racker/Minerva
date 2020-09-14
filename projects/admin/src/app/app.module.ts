import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth-gaurd.service';
// import { SharedModule } from 'src/app/_shared/shared.module';
const providers = [AuthGuardService]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
   // SharedModule
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
