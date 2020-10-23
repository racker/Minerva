import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ajv } from 'ajv';
import { environment } from 'src/environments/environment';
import { LoggingService } from 'src/app/_services/logging/logging.service';
import { LogLevels } from 'src/app/_enums/log-levels.enum';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { Schema } from 'src/app/_models/monitors';
import { PortalDataService } from '../portal/portal-data.service';

export const AJV_INSTANCE = new InjectionToken<Ajv>('The AJV Class Instance');

/**
 * The response of a validation result
 */
interface ValidateResult {
  // If the result is valid or not
  isValid: boolean;

  //Error text from the validator
  errorsText: string;
};

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private _schema: Schema;
  private mockedMonitors = new monitorsMock();
  get schema(): Schema {
    return this._schema;
  }

  set schema(scheme: Schema) {
    this._schema = scheme;
  }
  constructor(private readonly http: HttpClient, @Inject(AJV_INSTANCE) private readonly ajv: Ajv,
    private readonly logService: LoggingService, private readonly portalService: PortalDataService) {
    const dateTimeRegex = new RegExp(/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/);
    this.ajv.addFormat('date-time', {
      validate: (dateValue) => dateTimeRegex.test(dateValue)
    });
  }

  /**
   * Fetches the Schema and adds it to the validator schema set
   * @param name The name of the schema, this will be used as the key to store it
   * @param urlPath The URL path of the schema to load
  */
  loadSchema(): Promise<Schema | boolean> {
    return new Promise((res, rej) => {
      if (environment.mock) {
        this._schema = this.mockedMonitors.schema;
        this._schema['$id'] = this._schema.$schema;
        delete this._schema.$schema;
        this.ajv.removeSchema();
        this.ajv.addSchema(this._schema, 'monitor');
        res(this.schema);
      }
      else {
        this.http.get<Schema>(`${environment.api.salus}/${this.portalService.portalData.domainId}/schema/monitors`).subscribe(result => {
          result['$id'] = result.$schema;
          delete result.$schema;
          this._schema = result;
          this.ajv.removeSchema();
          this.ajv.addSchema(result, 'monitor');
          this.logService.log(`Schema: ${result}`, LogLevels.info);
          res(this._schema);
        });
      };
    });
  }

  /**
   * Validate data against a schema
   * @param data The data to validate
   * @returns ValidateResult
  */
  validateData<T>(data: T): ValidateResult {
    const isValid = this.ajv.validate('monitor', data) as boolean;
    return { isValid, errorsText: this.ajv.errorsText() };
  }
}
