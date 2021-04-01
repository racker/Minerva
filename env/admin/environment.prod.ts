
let absoluteHost = `${window.location.protocol}//${window.location.hostname}`;
let cloudTriggerUrl = 'https://us-central1-minerva-281312.cloudfunctions.net';
export const environment = {
  production: true,
  mock: false,
  api: {
    salus: `${absoluteHost}/api/monitoring/v1.0/tenant`,
    metrics: `api/metrics`,
    minerva:`${cloudTriggerUrl}/minerva-api-production-v1`
  }
};
