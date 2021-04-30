import { async } from '@angular/core/testing';
import { transformKeyPairs, MarkFormGroupTouched, implementsObject } from './utils'
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalusError } from 'src/app/_models/salusError';


describe('transformKeyPairs', () => {
    let testKeyArray;
    let form: FormGroup;
    const formBuilder: FormBuilder = new FormBuilder();
    beforeEach(async(() => {
        testKeyArray = [
            { key: 'ping', value: '127.0.1.1' },
            { key: 'os', value: 'linux' },
            { key: 'prod', value: 'false' }
        ];

        form = formBuilder.group({
            name: [''],
            type: [''],
            enabled: [''],
        });
    }));


    it('should create utility', () => {
        expect(transformKeyPairs).toBeTruthy();
    });

    it('should transform an array of key value pairings', () => {
        expect(transformKeyPairs(testKeyArray)).toEqual({
            'ping': '127.0.1.1',
            'os': 'linux',
            'prod': 'false'
        });
    });

    it('should mark all createMonitorForm controls as touched', () => {
        expect(form.controls['name'].touched).toEqual(false);
        expect(form.controls['name'].dirty).toEqual(false);
        expect(form.controls['type'].touched).toEqual(false);
        expect(form.controls['type'].dirty).toEqual(false);
        expect(form.controls['enabled'].touched).toEqual(false);
        expect(form.controls['enabled'].dirty).toEqual(false);
        MarkFormGroupTouched(form);
        expect(form.controls['name'].touched).toEqual(true);
        expect(form.controls['name'].dirty).toEqual(true);
        expect(form.controls['type'].touched).toEqual(true);
        expect(form.controls['type'].dirty).toEqual(true);
        expect(form.controls['enabled'].touched).toEqual(true);
        expect(form.controls['enabled'].dirty).toEqual(true);
    });


    it('should implementsObject return true', () => {
        let objProp = {
            app: "salus-telemetry-monitor-management",
            error: "Bad Request",
            errors: [],
            exception: "org.springframework.web.bind.MethodArgumentNotValidException",
            host: "monitor-management-67bc498945-bmp2m",
            message: "One or more field validations failed: ",
            status: 400,
            timestamp: "2021-01-21T14:47:23.237+00:00",
            traceId: "b85fb7657ac5bc05"
        }
        expect(implementsObject<SalusError>(objProp, ['traceId', 'app', 'host'])).toEqual(true);
    })

    it('should implementsObject return false', () => {
        let objProp = {
            app: "salus-telemetry-monitor-management",
            stuff: "Bad Request",
            errors: [],
            exception: "org.springframework.web.bind.MethodArgumentNotValidException",
            host: "monitor-management-67bc498945-bmp2m",
            message: "One or more field validations failed: ",
            status: 400,
            timestamp: "2021-01-21T14:47:23.237+00:00",
            notTraceId: "b85fb7657ac5bc05"
        }
        expect(implementsObject<SalusError>(objProp, ['traceId', 'app', 'host'])).toEqual(false);
    })

});