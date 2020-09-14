import { FieldConfig, Validator } from './interfaces/field.interface';
import { Validators } from '@angular/forms';
import { Monitor } from 'src/app/_models/monitors';
import { BoundMonitor } from 'src/app/_models/resources';

import { CreateTestMonitor } from './interfaces/testMonitor.interface';

export enum CntrlAttribute {
    string = "string",
    number = "number",
    checkbox="checkbox",
    select="select",
    datetime = "date-time",
    text="text",
    boolean="boolean",
    integer="integer",
    pattern="pattern",
    minimum="minimum",
    maximum="maximum",
    min="min",
    max="max",
    type="type",
    enum="enum",
    default="default",
    format="format",
    required="required",
    minLength="minLength",
    input="input",
    interval="interval",
    excludedResourceIds="excludedResourceIds",
    labelSelector = "labelSelector",
    resourceId="resourceId"
}


export class MonitorUtil {
    /**
     *
     * @param monitor a monitor based on schema type
     * @returns FieldConfig[]
     */
    static CreateMonitorConfig(monitor: any): FieldConfig[] {
        let fields: FieldConfig[] = [];
        for (const field in monitor.properties) {
            if (field === CntrlAttribute.type) {
                continue;
            }
            const config: FieldConfig = MonitorUtil.createField(monitor, field);
            fields.push(config);
        }
        return fields;
    }

    static ParseMonitorTypeEnum(monitor: any): string {
        let type: string;
        for (const field in monitor.properties) {
            if (field === CntrlAttribute.type) {
                type = monitor.properties[field].enum[0];
                break;
            }
        }
        return type;
    }

    /**
     *
     * @param monitor a monitor based on schema type
     * @param fieldName name of field of monitor.properties
     */
    static createField(monitor, fieldName): FieldConfig {

        let field = monitor.properties[fieldName];

        let label = () => {
            let _label = fieldName;
            return _label;
        }

        let fieldType = MonitorUtil.type(field);
        let fieldLabel = label();
        let fieldInputType = MonitorUtil.inputType(field);
        let fieldValidation = MonitorUtil.validators(monitor, field, fieldName);
        let fieldDefaultValue = MonitorUtil.defaultValue(field);
        let fieldOption = MonitorUtil.options(field);

        return {
            type: fieldType,
            ...(fieldLabel && { label: fieldLabel, name: fieldLabel }),
            ...(fieldInputType && { inputType: fieldInputType }),
            ...(fieldDefaultValue && { value: fieldDefaultValue }),
            ...(fieldValidation && { validations: fieldValidation }),
            ...(fieldOption && { options: fieldOption })
        };
    }

    private static options(field) {
        if (field.type === "string" && field.hasOwnProperty('enum')) {
            return field.enum;
        }
        return null;
    }

    private static defaultValue(field): string | null {
        let value;
        if (field.hasOwnProperty(CntrlAttribute.default)) {
            value = field.default;
        }
        return value || null;
    };

    private static inputType(field): string | null {
        let _inputType;
        if (field.type === CntrlAttribute.string) {
            if (field.hasOwnProperty(CntrlAttribute.format) && field.format === CntrlAttribute.datetime) {
                _inputType = CntrlAttribute.number;
            } else {
                _inputType = CntrlAttribute.text;
            }
        }
        if (field.type === CntrlAttribute.integer) {
            _inputType = CntrlAttribute.number;
        }
        return _inputType || null;
    }

    private static type(field): string {
        let _type;
        switch (true) {
            case field.type === CntrlAttribute.string && field.hasOwnProperty(CntrlAttribute.enum):
                _type = CntrlAttribute.select;
                break;
            case field.type === CntrlAttribute.boolean:
                _type = CntrlAttribute.checkbox;
                break;
            case field.type === CntrlAttribute.string:
            case field.type === CntrlAttribute.integer:
                _type = CntrlAttribute.input;
                break;
            default:
                throw `Field type ${field.type}  don't support`;
        }
        return _type;
    }


    private static validators(monitor, field, fieldName): Validator[] | null {
        let vals = [];
        // apply any required validators
        if (monitor.required.includes(fieldName)) {
            vals.push({
                name: CntrlAttribute.required,
                validator: Validators.required,
                message: `${fieldName} Required`
            })
        }

        // apply any pattern validators
        if (field.type === CntrlAttribute.string && field.hasOwnProperty(CntrlAttribute.pattern)) {
            vals.push({
                name: CntrlAttribute.pattern,
                validator: Validators.pattern(field.pattern),
                message: `${fieldName} format incorrect`
            });
        }

        // apply any minimum validators
        if (field.type === CntrlAttribute.string && field.hasOwnProperty(CntrlAttribute.minLength)) {
            vals.push({
                name: CntrlAttribute.minimum,
                validator: Validators.minLength(parseInt(field.minLength)),
                message: `${fieldName} must be at least ${field.minLength} character(s)`
            })
        }
        // Apply min and max validation over the number field
        if (field.type === CntrlAttribute.integer) {
            if (field.hasOwnProperty(CntrlAttribute.minimum)) {
                vals.push({
                    name: CntrlAttribute.min,
                    validator: Validators.min(parseInt(field.minimum)),
                    message: `The minimum value to accept for this input ${field.minimum}`
                })
            }
            if (field.hasOwnProperty(CntrlAttribute.maximum)) {
                vals.push({
                    name: CntrlAttribute.max,
                    validator: Validators.max(parseInt(field.maximum)),
                    message: `The maximum value to accept for this input ${field.maximum}`
                })
            }
        }
        return vals.length > 0 ? vals : null;
    }

    static formatSummaryField(monitor: Monitor) {
        if(monitor.summary[Object.keys(monitor.summary)[0]]){
            return `${monitor.details.plugin.type}-${monitor.summary[Object.keys(monitor.summary)[0]]}-${monitor.id.substr(monitor.id.length - 5)}`;
        }else{
            return `${monitor.details.plugin.type}-${monitor.id.substr(monitor.id.length - 5)}`;
        }
    }

    static formatTitleField(monitor: BoundMonitor) {
        return `${monitor.monitorType}-${monitor.monitorId.substr(monitor.monitorId.length - 5)}`;
    }

    static formatTestMonitor(resourceId, monitor: Monitor): CreateTestMonitor {
        return {
            resourceId,
            details: {
                type: monitor.details.type,
                ...(monitor.details.type === 'remote' && {
                    monitoringZones: monitor.details.monitoringZones
                }),
                plugin: {
                    type: monitor.details.plugin.type
                }
            }
        }
    }
}

