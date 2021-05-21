export interface IMetric {
    group:string,
    metricName:string[]
}



interface QueryMetricResponse {
    data?: Metric,
    metadata?: MetaData
}

interface MetaData {
    aggregator?: string,
    startTime?: Date,
    endTime?: Date
}
interface Metric {
    tenant?: string,
    metricName?: string,
    tags?: {
        [key: string]: string
    },
    values?:any
}