
let absoluteHost = `${window.location.protocol}//${window.location.hostname}`;
export const environment = {
  production: true,
  mock: false,
  api: {
    salus: `${absoluteHost}/api/monitoring/v1.0/tenant`,
    metrics: `api/metrics`,
    minerva:`${absoluteHost}/api/intelligence/minerva-api-production-v1`
  },
  firebase: {
    apiKey: 'AIzaSyBsq3WqmOANde5rBKXw5jsaNKFke7CqAjk',
    authDomain: 'minerva-281312.firebaseapp.com'
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
    adminAccess:true
  }
};
