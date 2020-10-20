
import { FeatureConfig } from "./featureConfig.service";
import { environment} from "../../../environments/environment";
import { getTestBed, TestBed } from "@angular/core/testing";
describe('Feature and Environment Config', () => {
    let featConf: FeatureConfig;
    let injector: TestBed;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FeatureConfig]
        })
        injector = getTestBed();
        featConf = injector.inject(FeatureConfig);
    });

    it('should Load Feature Flag', (done)=>{
        featConf.loadFeatureConfig();
        expect(featConf.featureFlags.adminAccess).toBe(environment.featureFlags.adminAccess)
        done();
    })

});