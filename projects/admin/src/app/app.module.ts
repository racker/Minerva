import ajv from 'ajv';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'env/minerva/environment';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { envConfig, EnvironmentConfig } from '@minerva/_services/config/environmentConfig.service';
//modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { ResourcesModule } from 'src/app/_features/resources/resources.module';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance, MonitorsModule } from 'src/app/_features/monitors/monitors.module';
import { FavoritesModule } from 'src/app/_features/favorites/favorites.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//services
import { AuthGuardService } from './_services/auth/auth.guard';
import { ImpersonationService } from './_services/tenant/impersonation.service';
import { TokenService } from './_services/auth/token.service';
import { DashboardDirective } from './_services/dashboard.directive';
import { SchemaResolver } from '@minerva/_features/monitors/monitor.resolve';
import { DynamicComponentService } from './_services/dynamicComponent.service';
import { AJV_INSTANCE, SchemaService } from '@minerva/_services/monitors/schema.service';
//components
import { AppComponent } from './app.component';
import { AdminResourceDetailsPage } from './dashboard/_features/resources/admin-resource-details.page';
import { DashboardComponent } from 'projects/admin/src/app/dashboard/dashboard.component';
import { MonitorDetailsComponent } from './dashboard/_features/monitors/monitorDetails.component';
// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TimeoutInterceptor } from '@minerva/_interceptors/timeout.interceptor';

const providers = [
  AuthGuardService,
  TokenService,
  ImpersonationService,
  HttpClientModule,
  HttpClient,
  SchemaResolver,
  SchemaService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TimeoutInterceptor,
    multi: true
  },
  DynamicComponentService,
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
    deps: [EnvironmentConfig],
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardDirective,
    AdminResourceDetailsPage,
    MonitorDetailsComponent
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
    FavoritesModule,
    HttpClientModule
  ],
  providers: providers,
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
