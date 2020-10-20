import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { StorageModule } from '@ngx-pwa/local-storage';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoggingService } from './_services/logging/logging.service';
import { PortalDataService } from './_services/portal/portal-data.service';
import { SharedModule } from './_shared/shared.module';
import { SchemaResolver } from './_features/monitors/monitor.resolve';
import { SchemaService, AJV_INSTANCE } from './_services/monitors/schema.service';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from './_features/monitors/monitors.module';
import ajv from 'ajv';
import { AdminAppModule } from 'projects/admin/src/app/app.module';
import { featConfig, FeatureConfig } from './_services/featureConfig/featureConfig.service';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent
  ],
  imports: [    
    AppRoutingModule,
    AdminAppModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    StorageModule.forRoot({
      LSPrefix: 'intelligence_', // Note the underscore
      IDBDBName: 'intelligence_ngStorage',
    })
  ],
  exports: [],
  providers: [
    SchemaResolver,
    SchemaService,
    { provide: AJV_CLASS, useValue: ajv },
    { provide: AJV_CONFIG, useValue: { useDefaults: true } },
    {
      provide: AJV_INSTANCE,
      useFactory: createAjvInstance,
      deps: [AJV_CLASS, AJV_CONFIG]
    },
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
    },
    {
			provide: APP_INITIALIZER,
			useFactory: featConfig,
			deps: [ FeatureConfig ],
			multi: true
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
