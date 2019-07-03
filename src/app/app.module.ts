import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { localStorageProviders } from '@ngx-pwa/local-storage';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { LoggingService } from './_services/logging/logging.service';
import { PortalDataService } from './_services/portal/portal-data.service';
import { SharedModule } from './_shared/shared.module';
import { AppStoreModule } from './_store/app-store.module';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    SharedModule.forRoot(),
    AppStoreModule
  ],
  exports: [],
  providers: [
    localStorageProviders({ prefix: 'intelligence' }),
    {
      provide: APP_INITIALIZER,
      useFactory: portalData,
      multi: true,
      deps: []
    },
    {
      provide: APP_INITIALIZER,
      useFactory: logger,
      multi: true,
      deps: []
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}

export function portalData(): any {
  new PortalDataService();
  return () => {};
}

export function logger(): any {
  var logger = new LoggingService();
  // if we don't currently have a log level set
  // set the level to a default of error
  if (!logger.getLevel()){
    logger.setLevel(logger.logLevels.error);
  }
  return () => {};
}
