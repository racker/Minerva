
//import the core angular services
import { Injectable } from "@angular/core";
// importing Environments
import { environment } from "../../../environments/environment";



/** 
 * factory function
 * @return FeatureConfig instance
 */
export function featConfig(config: FeatureConfig) {
    return (() => {
        config.loadFeatureConfig();
    });
}

export interface FeatureFlags {
    [name: string]: boolean;
}

/**
 * Load Environments proerties to use them as Global
 */
@Injectable({
	providedIn: "root"
})
export class FeatureConfig {


    featureFlags:FeatureFlags;
	
	constructor() {

	}

    /**
     * load feature config Through Envrionment file
     */
	public loadFeatureConfig()  {
        // merging Environment in local instance
        Object.assign( this, environment );
	}

}