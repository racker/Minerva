export const environment = {
  production: true,
  mock: false,
  api: {
    salus: 'api/monitoring/v1.0/tenant',
    metrics: 'api/metrics'
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
  }
};
