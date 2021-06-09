import { NgModule, CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { FavoritesService } from '../../_services/favorites/favorites.service';
import { FavoriteComponent } from './favorites.component'


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    FavoriteComponent
 ],
  imports: [
    SharedModule,
  ],
  providers: [
    FavoritesService
 ],
  exports: [
    FavoriteComponent
  ]
})
export class FavoritesModule { }
