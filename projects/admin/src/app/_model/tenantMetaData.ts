import { Pagination } from "src/app/_models/common";

export interface TenantmetaData {
    id?:string;
    tenantId: string;
    accountType: string;
    metadata: { 
        description: string 
    },
    createdTimestamp?:string;
    updatedTimestamp?:string;
}

export interface TenantmetaDataList extends Pagination{
content: TenantmetaData[];
}

