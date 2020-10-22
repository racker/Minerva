
//import the core angular services
import { Injectable } from "@angular/core";
// importing Environments
import { environment } from "../../../environments/environment";



/** 
 * factory function
 * @return FeatureConfig instance
 */
export function envConfig(config: EnvironmentConfig) {
    return (() => {
        config.loadEnvironment();
    });
}

export interface FeatureFlags {
  [name: string]: boolean;
}

export interface Pagination {
  
    pageSize: number,
    resources: {
      pageSize: number
    },
    monitors: {
      pageSize: number
    }
  
}

/**
 * Load Environments proerties to use them as Global
 */
@Injectable({
	providedIn: "root"
})
export class EnvironmentConfig {

  production: boolean;
  mock: boolean;
  featureFlags:FeatureFlags;
  api:{[name: string]: boolean;}
  pagination:Pagination;
  resources: {
    disallowLabelEdit: string
  };
	
	constructor() {

	}

    /**
     * load feature config Through Envrionment file
     */
	public loadEnvironment()  {
        // merging Environment in local instance
        Object.assign( this, environment );
        // console.log(this.pagination.pageSize);
	}

}