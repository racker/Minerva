
//import the core angular services
import { Injectable } from "@angular/core";
// importing Environments
import { environment } from "env/minerva/environment";
import { environment as adminEnvironment  } from 'env/admin/environment';



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
  isAdmin : boolean;
  featureFlags:FeatureFlags;
  api:{[name: string]:string;}
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
      if(typeof window['PORTAL_DATA'] === 'undefined') {
        Object.assign( this, adminEnvironment );
      }  else {
        Object.assign( this, environment );
      }
        // merging Environment in local instance
	}

}