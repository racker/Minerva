export interface TenantMetadata {
    id?:string;
    tenantId: string;
    accountType: string;
    metadata: { 
        description: string 
    },
    createdTimestamp?:string;
    updatedTimestamp?:string;
}

