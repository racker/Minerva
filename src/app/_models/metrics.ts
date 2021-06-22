import { TimeRange } from "@minerva/_models/timerange";

export interface Visualize {
    group: string[];
    metrics: string[];
    tags?: string[];
    date: TimeRange//,
    //values?: any
}

export interface QueryMetricResponse {
    data?: Metric,
    metadata?: MetaData
}

interface MetaData {
    aggregator?: string,
    startTime?: string,
    endTime?: string
}
interface Metric {
    tenant?: string,
    metricName?: string,
    tags?: {
        [key: string]: string
    },
    values?:any
}