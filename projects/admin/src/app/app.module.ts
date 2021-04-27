import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './_services/auth/auth.guard';
import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
import { SharedModule } from 'src/app/_shared/shared.module';
import { environment } from 'env/minerva/environment';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance, MonitorsModule } from 'src/app/_features/monitors/monitors.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DashboardDirective } from './_services/dashboard.directive';
import { envConfig, EnvironmentConfig } from '../../../../src/app/_services/config/environmentConfig.service';


import { ResourcesModule } from 'src/app/_features/resources/resources.module';

import { AdminResourceDetailsPage } from './dashboard/_features/resources/pages/details/admin-resource-details.page';
/*import { EventsModule } from 'src/app/_features/events/events.module';
import { DetailsComponent } from './_features/monitors/pages/details/details.component';
import { EventDetailsComponent } from './_features/events/event-details/event-details.component';
import { TenantMetadataListComponent } from './_features/tenantMetadata/pages/tenant-metadata-list/tenant-metadata-list.component';
*/




// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DashboardComponent } from 'projects/admin/src/app/dashboard/dashboard.component';
import { DataService } from './_services/data.service';
import { AJV_INSTANCE, SchemaService } from 'src/app/_services/monitors/schema.service';
import ajv from 'ajv';
import { DetailsComponent } from './dashboard/_features/monitors/pages/details/details.component';
import { SchemaResolver } from 'src/app/_features/monitors/monitor.resolve';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const providers = [AuthGuardService, 
  TokenService,
   ImpersonationService, 
   HttpClientModule,
    HttpClient,
    SchemaResolver,
    SchemaService,
    DataService, 
    { provide: AJV_CLASS, useValue: ajv },
    { provide: AJV_CONFIG, useValue: { useDefaults: true } },
    {
      provide: AJV_INSTANCE,
      useFactory: createAjvInstance,
      deps: [AJV_CLASS, AJV_CONFIG]
    },
    
    {
  provide: APP_INITIALIZER,
  useFactory: envConfig,
  deps: [ EnvironmentConfig ],
  multi: true
}

];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardDirective,
    AdminResourceDetailsPage,
    DetailsComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    ResourcesModule,
    CommonModule,
    SharedModule,
    MonitorsModule,
    HttpClientModule
  ],
  providers: providers,
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
