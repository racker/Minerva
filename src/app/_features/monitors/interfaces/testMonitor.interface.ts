export interface CreateTestMonitor {
    resourceId: string,
    details: {
        type: 'local' | 'remote' | string,
        monitoringZones?: string[],
        plugin: {
            type: string
        }
    }
}