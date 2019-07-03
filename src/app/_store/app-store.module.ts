import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EntityDataService, DefaultDataServiceConfig, NgrxDataModule } from 'ngrx-data';
import { entityConfig } from './entity-metadata';

import { ResourcesService } from '../_services/resources/resources.service'

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'stuff',
  timeout: 3000, // request timeout
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgrxDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [
    ResourcesService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class AppStoreModule {
  constructor(entityDataService: EntityDataService,
    resourcesService: ResourcesService){
      entityDataService.registerService('Resource', resourcesService);
    }

}
