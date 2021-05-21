export interface IMetric {
    name: string;
    mean: number;
    time: number;
}

export interface IMetricField {
    name: string;
    fieldKey: string;
    fieldType: string;
}

export interface IMeasurement {
    name: string;
}

export interface IDevice {
    name: string;
    deviceLabel: string;
    device: string;
}
