
import { envConfig, EnvironmentConfig } from "./environmentConfig.service";
import { getTestBed, TestBed } from "@angular/core/testing";
import { APP_INITIALIZER } from "@angular/core";
describe('Feature and Environment Config', () => {
    let featConf: EnvironmentConfig;
    let injector: TestBed;
    let env: EnvironmentConfig;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EnvironmentConfig,
                {
                    provide: APP_INITIALIZER,
                    useFactory: envConfig,
                    deps: [ EnvironmentConfig ],
                    multi: true
                }]
        })
        injector = getTestBed();
        env = injector.inject(EnvironmentConfig);
        featConf = injector.inject(EnvironmentConfig);
    });

    it('should Load Feature Flag', (done)=>{
        featConf.loadEnvironment();
        expect(featConf.featureFlags.adminAccess).toBe(env.featureFlags.adminAccess);
        done();
    })

});