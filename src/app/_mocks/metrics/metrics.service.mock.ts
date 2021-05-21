import { default as metricsDevices } from './devices.json';
import { default as metricsFields } from './fields.json';
import { default as metrics } from './metrics.json';
import { default as metricMeasurements } from './measurements.json';

import {
    IDevice,
    IMeasurement,
    IMetricField,
    IMetric
} from '../../_models/metrics';

export class metricMocks {
    devices: IDevice[] = metricsDevices;
    fields: IMetricField[] = metricsFields;
    metrics: IMetric[] = metrics;
    measurements: IMeasurement[] = metricMeasurements;
}
