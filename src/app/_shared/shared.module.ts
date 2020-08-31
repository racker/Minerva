import { NgModule, ModuleWithProviders, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GlobalErrorHandler } from './global-error.handler';
import {ServerErrorInterceptor } from '../_interceptors/server-error.interceptor';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalComponent } from './components/_modal/modal.component';
import { MeasurementNamePipe } from './pipes/measurement-name.pipe';
import { DeviceNamePipe } from './pipes/device-name.pipe';
import { AddFieldsComponent } from './components/add-fields/add-fields.component';
import { DurationSecondsPipe } from './pipes/duration-seconds.pipe';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    BreadcrumbComponent,
    PaginationComponent,
    ModalComponent,
    DeviceNamePipe,
    DurationSecondsPipe,
    MeasurementNamePipe,
    AddFieldsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    PaginationComponent,
    ModalComponent,
    AddFieldsComponent,
    MeasurementNamePipe,
    DeviceNamePipe,
    DurationSecondsPipe
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
