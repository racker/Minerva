import {  Pagination} from "../_models/common";
interface Labels {
    agent_discovered_arch?: string;
    agent_discovered_hostname?: string;
    agent_discovered_os?: string;
    [key: string]: any
}

export interface Resource {
    tenantId: string;
    resourceId: string;
    labels?: Labels;
    metadata: {
        [key: string]: any;
    }
    presenceMonitoringEnabled: boolean;
    associatedWithEnvoy: boolean;
    createdTimestamp: string | Date;
    updatedTimestamp: string | Date;
    checked?:boolean;
}

export interface Resources {
    content: Resource[];
    number: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;

}

export interface CreateResource {
    resourceId: string,
    presenceMonitoringEnabled: boolean;
}

export interface BoundMonitorPaging extends Pagination {
    content:BoundMonitor[];   
}
export interface BoundMonitor{
    monitorId: string,
    monitorType: string,
    monitorName:string,
    resourceId: string,
    interval: string,
    selectorScope: string,
    agentType: string,
    renderedContent: string,
    envoyId: string,
    createdTimestamp: string,
    updatedTimestamp: string
}

