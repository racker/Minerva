import { Injectable } from '@angular/core';
import { EnvironmentConfig } from "../config/environmentConfig.service";

@Injectable()
export class FeatureFlagService {

    constructor(private env: EnvironmentConfig) { }
  featureOff(featureName: string) {
    // Read the value from the config service
    if (this.env.featureFlags.hasOwnProperty(featureName)) {
        return !this.env.featureFlags[featureName];
    }
    return true; // if feature not found, default to turned off
  }

  featureOn(featureName: string) {
    return !this.featureOff(featureName);
  }
}