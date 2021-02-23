import { Injectable } from "@angular/core";
import { CanLoad, Route } from "@angular/router";
import { FeatureFlagService } from "src/app/_services/features/featureFlag.service";
import { EnvironmentConfig } from '../_services/config/environmentConfig.service';
@Injectable()
export class FeatureFlag implements CanLoad {

  constructor(private featureFlagService: FeatureFlagService, private env: EnvironmentConfig ) { }
    canLoad(route: Route):  Promise<boolean> | boolean {
        // Get the name of the feature flag from the route data provided
        const featureFlag = route.data['featureFlag'];
        if (featureFlag) {
            return this.featureFlagService.featureOn(featureFlag);
        }
        else {
            return true;
        }
    }
}