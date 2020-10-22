
import { EnvironmentConfig } from "./environmentConfig.service";
import { environment} from "../../../environments/environment";
import { getTestBed, TestBed } from "@angular/core/testing";
describe('Feature and Environment Config', () => {
    let featConf: EnvironmentConfig;
    let injector: TestBed;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EnvironmentConfig]
        })
        injector = getTestBed();
        featConf = injector.inject(EnvironmentConfig);
    });

    it('should Load Feature Flag', (done)=>{
        featConf.loadEnvironment();
        expect(featConf.featureFlags.adminAccess).toBe(environment.featureFlags.adminAccess)
        done();
    })

});