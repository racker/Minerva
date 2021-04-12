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
import { MonitorsModule } from 'src/app/_features/monitors/monitors.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { envConfig, EnvironmentConfig } from '../../../../src/app/_services/config/environmentConfig.service';

const providers = [AuthGuardService, TokenService, ImpersonationService, HttpClientModule, HttpClient,
{ provide: 'Window',  useValue: window },  {
  provide: APP_INITIALIZER,
  useFactory: envConfig,
  deps: [ EnvironmentConfig ],
  multi: true
}

];

import { ResourcesModule } from 'src/app/_features/resources/resources.module';

/*import { AdminResourceDetailsPage } from './_features/resources/pages/details/admin-resource-details.page';
import { EventsModule } from 'src/app/_features/events/events.module';
import { DetailsComponent } from './_features/monitors/pages/details/details.component';
import { EventDetailsComponent } from './_features/events/event-details/event-details.component';
import { TenantMetadataListComponent } from './_features/tenantMetadata/pages/tenant-metadata-list/tenant-metadata-list.component';
*/




// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DashboardComponent } from 'projects/admin/src/app/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
