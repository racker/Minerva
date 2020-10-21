const express = require('express');
const router = express.Router();
const Resources = require('./routes/resources');
const Monitors = require('./routes/monitors');
const Metrics = require('./routes/metrics');
const Labels = require('./routes/labels');
const ResourceSearch = require('./routes/resources-search');
const Schema = require('./routes/schema');
const MonitorSearch = require('./routes/monitors-search');
const Zones = require(`./routes/zones`);
const Event = require('./routes/event-task');
const TestMonitor = require('./routes/test-monitor')

//all Monitoring V2 routes
router.use('/monitoring/v1.0/tenant/:tenant', Labels);
router.use('/monitoring/v1.0/tenant/:tenant/test-monitor', TestMonitor);
router.use('/monitoring/v1.0/tenant/:tenant/resources-search', ResourceSearch);
router.use('/monitoring/v1.0/tenant/:tenant/schema', Schema);
router.use('/monitoring/v1.0/tenant/:tenant/monitors-search', MonitorSearch);
router.use('/monitoring/v1.0/tenant/:tenant/resources', Resources);
router.use('/monitoring/v1.0/tenant/:tenant/monitors', Monitors);
router.use('/monitoring/v1.0/tenant/:tenant/zones',Zones);
router.use('/monitoring/v1.0/tenant/:tenant/event-tasks',Event);

//all Metrics V2 routes
router.use('/metrics', Metrics);

module.exports = router