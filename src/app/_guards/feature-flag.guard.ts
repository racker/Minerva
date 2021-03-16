import { Injectable } from "@angular/core";
import { CanLoad, Route } from "@angular/router";
import { EnvironmentConfig } from '../_services/config/environmentConfig.service';
@Injectable()
export class FeatureFlag implements CanLoad {

  constructor(private env: EnvironmentConfig ) { }
    canLoad(route: Route):  Promise<boolean> | boolean {
        // Get the name of the feature flag from the route data provided
        const featureFlag = route.data['featureFlag'];
        if (featureFlag) {
            return this.env.featureFlags[featureFlag]
        }
        else {
            return true;
        }
    }
}