
interface Tags {
    metricGroup:string;
    monitoring_system: string,
    resource: number,
    resource_account_id: number,
    resource_cmdb_source: string,
    resource_datacenter: string,
    resource_device_id: number,
    resource_label: string,
    resource_product_description: string,
    resource_server_name: string,
    resource_status: string,
    system_contextUUID: string,
    system_device: number,
    system_key: string,
    system_zenoss_tenant_id: string
}


export interface Favorite {
    tenant: string;
    metricName: string;
    measurement: string;
    tags?: Tags;
    values?: object;
}





