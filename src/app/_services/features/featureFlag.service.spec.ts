import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { FeatureFlagService } from './featureFlag.service';
import { envConfig, EnvironmentConfig } from '../config/environmentConfig.service';



describe('Feature and Environment Config', () => {
    let featFlagService: FeatureFlagService;
    let injector: TestBed;
    let env: EnvironmentConfig;
  
    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientModule
          ],
          providers: [
            FeatureFlagService,
            {
              provide: APP_INITIALIZER,
              useFactory: envConfig,
              deps: [ EnvironmentConfig ],
              multi: true
            }
          ],
    
        });
        injector = getTestBed();
        featFlagService = injector.inject(FeatureFlagService);
        env= injector.inject(EnvironmentConfig);

      });

      it('should return false if feature is off', () => {
        let featureName = 'resources';
        expect(featFlagService.featureOn(featureName)).toBe(env.featureFlags[featureName]);
      });

});

