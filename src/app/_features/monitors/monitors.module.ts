import { NgModule, CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';
import { LabelService } from '../../_services/labels/label.service';
import { MonitorService } from '../../_services/monitors/monitor.service';
import { MonitorslistComponent } from './components/list/monitorslist.component';
import { MonitorsPage } from './pages/monitors/monitors.page';
import { MonitorDetailsPage } from './pages/details/monitor-details.page';
import { MonitorCreatePage } from './pages/create/monitor-create.page';
import { routes } from './monitors.routes';
import { Ajv, Options } from 'ajv';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ResourcesService } from 'src/app/_services/resources/resources.service';
import { AdditionalSettingsComponent } from './components/additional-settings/additional-settings.component';
import { DurationSecondsPipe } from 'src/app/_shared/pipes/duration-seconds.pipe';
import { ResourceListComponent } from './components/resource_list/resource-list.component';
import { MonitorSearchComponent } from './components/monitor-search/monitor-search.component';
import { ZoneService } from 'src/app/_services/zones/zones.service';


export const AJV_CLASS = new InjectionToken<Ajv>('The AJV Class Instance');
export const AJV_CONFIG = new InjectionToken<Ajv>('The AJV Class config');

export function createAjvInstance(AjvClass: any, config: Options) {
  return new AjvClass(config);
}

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    MonitorsPage,
    MonitorslistComponent,
    MonitorDetailsPage,
    MonitorCreatePage,
    InputComponent,
    CheckboxComponent,
    SelectComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    AdditionalSettingsComponent,
    ResourceListComponent,
    MonitorSearchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MonitorService,
    LabelService,
    ResourcesService,
    ZoneService,
    DurationSecondsPipe
  ],
  entryComponents: [
    InputComponent,
    CheckboxComponent,
    SelectComponent
  ],
  exports: [
    MonitorslistComponent,
    MonitorCreatePage,
    DynamicFormComponent,
    ResourceListComponent
  ]
})
export class MonitorsModule { }
