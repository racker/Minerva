import { TestBed, getTestBed } from '@angular/core/testing';
import { SchemaService, AJV_INSTANCE } from './schema.service';
import { HttpClientModule } from '@angular/common/http';
import { AJV_CLASS, AJV_CONFIG, createAjvInstance } from 'src/app/_features/monitors/monitors.module';
import ajv from 'ajv';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { APP_INITIALIZER } from '@angular/core';
import { envConfig, EnvironmentConfig } from '../featureConfig/environmentConfig.service';

describe('SchemaService', () => {
  let injector: TestBed;
  let service: SchemaService;
  let env: EnvironmentConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: AJV_CLASS, useValue: ajv },
        { provide: AJV_CONFIG, useValue: { useDefaults: true } },
        {
          provide: AJV_INSTANCE,
          useFactory: createAjvInstance,
          deps: [AJV_CLASS, AJV_CONFIG]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: envConfig,
          deps: [ EnvironmentConfig ],
          multi: true
        }
      ]
    });
    injector = getTestBed();
    service = injector.inject(SchemaService);
    env = injector.inject(EnvironmentConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set & get schema', () => {
    service.schema = new monitorsMock().schema;
    expect(service.schema.description).toEqual("Salus Monitor definition");
  });

  it('should load schema file', async() => {
    await service.loadSchema();
    expect(service.schema.description).toEqual("Salus Monitor definition");
  });


});
