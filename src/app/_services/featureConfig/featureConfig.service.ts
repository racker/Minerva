
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";


// factory function
export function featConfig(config: FeatureConfig) {
    return (() => {
        config.loadFeatureConfig();
    });
}

export interface FeatureFlags {
    [name: string]: boolean;
}

@Injectable({
	providedIn: "root"
})
export class FeatureConfig {

    featureFlags!:FeatureFlags;
	
	constructor() {

	}

	// load feature config 
	public loadFeatureConfig()  {
        Object.assign( this, environment )
	}

}