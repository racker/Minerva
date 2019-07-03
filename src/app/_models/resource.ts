export interface Resources {
    content: Array<Resource>,
    number: number,
    totalPages: number,
    totalElements: number,
    last: boolean,
    first: boolean
}

export interface Resource {
    tenantId: string,
    resourceId: string,
    labels: {},
    metadata: {},
    presenceMonitoringEnabled: boolean,
    region: string,
    associatedWithEnvoy: true,
    createdTimestamp: Date,
    updatedTimestamp: Date
}