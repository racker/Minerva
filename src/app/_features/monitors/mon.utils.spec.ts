import { async } from '@angular/core/testing';
import {MonitorUtil } from './mon.utils';
import {
    CreateMonitor
} from 'src/app/_models/salus.monitor'
import { Monitor } from 'src/app/_models/monitors';

describe('Monitor Utilities', () => {

    let newMonitor: CreateMonitor;
    let schemaMonitor;
    beforeEach(async(() => {
        newMonitor = {
            name: 'Tight Monitor',
            labelSelector: {
                agent_discovered_os: 'linux',
                agent_hostname: 'mranderson'
            },
            labelSelectorMethod: 'AND',
            resourceId: '45544',
            excludedResourceIds: ['8774736', '6355266'],
            interval: '60'

        };

        schemaMonitor = {
            type: "object",
            additionalProperties: false,
            properties: {
                mount: {
                    type: "string",
                    pattern: "^.*\\S+.*$",
                    minLength: 2,
                    default: "/"
                },
                filesys: {
                    type: "boolean",
                    default: true
                },
                size: {
                    type: "integer",
                }
            },
            title: "disk",
            required: [
                "mount",
                "size"
            ]
        }
    }));

    afterEach(async(() => {
        schemaMonitor = null;
    }));

    describe('ParseMonitorTypeEnum', () => {
        it('should create utility', () => {
            expect(MonitorUtil.ParseMonitorTypeEnum).toBeTruthy();
        });

        it('should parse monitor properties for enum monitor value', () => {
            let monitorProps = {
                properties: {
                "type": {
                    "type": "string",
                    "enum": [
                        "cpu"
                    ],
                    "default": "cpu"
                },
                "percpu": {
                    "type": "boolean"
                }
                }
            };
            let parsedEnum = MonitorUtil.ParseMonitorTypeEnum(monitorProps);
            expect(parsedEnum).toEqual('cpu');

        })
    });

    describe('CreateMonitorConfig()', () => {
        it('should create utility', () => {
            expect(MonitorUtil.CreateMonitorConfig).toBeTruthy();
        });

        it('should create array of FieldConfig fields', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            expect(fields.length).toEqual(3);
        });

        it('should add type "input" to controls', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            const mountField = fields.find((el) => el.name === 'mount');
            const sizeField = fields.find((el) => el.name === 'size');
            expect(sizeField.type).toEqual('input');
            expect(mountField.type).toEqual('input');
        });

        it('should add type "input" to controls', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            const mountField = fields.find((el) => el.name === 'mount');
            const sizeField = fields.find((el) => el.name === 'size');
            expect(sizeField.type).toEqual('input');
            expect(mountField.type).toEqual('input');
        });

        it('should add type "checkbox" to controls', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            const fileSysField = fields.find((el) => el.name === 'filesys');
            expect(fileSysField.type).toEqual('checkbox');
        });

        it('should add name controls', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            const mountField = fields.find((el) => el.name === 'mount');
            expect(mountField.name).toEqual('mount');
        });

        it('should add default values', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            const mountField = fields.find((el) => el.name === 'mount');
            const filesysField = fields.find((el) => el.name === 'filesys');
            expect(filesysField.value).toEqual(true);
            expect(mountField.value).toEqual("/");
        });

        it('should add validations', () => {
            const fields = MonitorUtil.CreateMonitorConfig(schemaMonitor);
            const mountField = fields.find((el) => el.name === 'mount');
            const sizeField = fields.find((el) => el.name === 'size');
            expect(mountField.validations.length).toEqual(3);
            expect(sizeField.validations.length).toEqual(1);
        });
    });

    it('should create monitor tag', () => {
        let monitor: Monitor = Object.assign({
            id: "9af34979-2cc5-41b3-b73b-26bc479f2c14",
            name: null,
            labelSelector: null,
            interval: "PT34S",
            labelSelectorMethod: "AND",
            details: {
                type: "remote",
                plugin: {
                    type: "ping",
                    target: "access.com",
                    count: 12,
                    pingInterval: "PT34S"
                },
            },
            summary: {
                protocol: "tcp",
                port: "6397",
                host: "192.168.0.1"
            },
            createdTimestamp: "2020-06-17T12:48:45Z",
            updatedTimestamp: "2020-06-17T12:48:45Z"
        }, newMonitor);
        expect(MonitorUtil.formatSummaryField(monitor)).toEqual("ping-tcp-f2c14");
        monitor.summary = {};
        expect(MonitorUtil.formatSummaryField(monitor)).toEqual("ping-f2c14");
    })
});