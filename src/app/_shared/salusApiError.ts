export interface SalusError { 
    timestamp?:string,
    status?: number,
    error?: string,
    exception?: string,
    message?: string,
    errors: [],
    app?: string,
    host?:string,
    traceId?: string
}
