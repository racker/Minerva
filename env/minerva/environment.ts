// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let absoluteHost = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
export const environment = {
  production: false,
  mock: false,
  isAdmin : false,
  api: {
    salus: `${absoluteHost}/api/monitoring/v1.0/tenant`,
    metrics: `${absoluteHost}/api/metrics`,
    minerva:`${absoluteHost}/api/intelligence/minerva-api-staging-v1`
  },
  firebase: {
    apiKey: 'AIzaSyBsq3WqmOANde5rBKXw5jsaNKFke7CqAjk',
    authDomain: 'dev.i.rax.io'
  },
  pagination: {
    pageSize: 25,
    resources: {
      pageSize: 25
    },
    monitors: {
      pageSize: 25
    }
  },
  resources: {
    disallowLabelEdit: 'agent_'
  },
  featureFlags:{
    admin:false,
    monitors: false,
    resources: false,
    visualize: true,

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
