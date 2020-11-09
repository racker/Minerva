import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SchemaService, AJV_INSTANCE } from 'src/app/_services/monitors/schema.service';
import { SchemaResolver } from './monitor.resolve';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from './monitors.module';
import ajv from 'ajv';

describe('SchemaResolver', () => {
    let injector: TestBed;
    let resolveService: SchemaResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                SchemaResolver,
                SchemaService,
                { provide: AJV_CLASS, useValue: ajv },
                { provide: AJV_CONFIG, useValue: { useDefaults: true } },
                {
                    provide: AJV_INSTANCE,
                    useFactory: createAjvInstance,
                    deps: [AJV_CLASS, AJV_CONFIG]
                }
            ]
        });
        injector = getTestBed();
        resolveService = injector.get(SchemaResolver);
    });

    it('should be created', () => {
        expect(resolveService).toBeTruthy();
    });

});
