
let absoluteHost = `${window.location.protocol}//${window.location.hostname}`;
export const environment = {
  production: true,
  mock: false,
  api: {
    salus: `${absoluteHost}/api/monitoring/v1.0/tenant`,
    metrics: `api/metrics`,
    minerva:`${absoluteHost}/api/intelligence/minerva-api-production-v1`
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
    adminAccess:true,
    admin:false,
    monitors: false,
    resources: false,
    visualize: true,
  }
};
