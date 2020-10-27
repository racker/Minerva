import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, flatMap } from 'rxjs/operators';
import { PortalDataService } from '../portal/portal-data.service';
import { LogLevels } from '../../_enums/log-levels.enum';
import { IMetric, IMetricField, IMeasurement, IDevice } from 'src/app/_models/metrics';
import { Observable, of, BehaviorSubject, from } from 'rxjs';
import { LoggingService } from '../../_services/logging/logging.service';
import { metricMocks } from '../../_mocks/metrics/metrics.service.mock';
import { InfluxService } from '../influx/influx.service';
import { DeviceNamePipe } from '../../_shared/pipes/device-name.pipe';
import { EnvironmentConfig } from '../featureConfig/environmentConfig.service';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  // private fields
  private mocks = new metricMocks()
  private readonly db: string = `CORE-${this.portalDataService.portalData.domainId}`;
  private readonly metricsURL:string;
  // metricFields will act as an BehaviorSubject that notes any change in
  // in metricFields
  private metricFields = new BehaviorSubject<IMetricField[] | null>(null);
  // metricMeasurements will act as a BehaviorSubject that notes any change in
  // in measurements
  private metricMeasurements = new BehaviorSubject<IMeasurement[] | null>(null);
  // metricDevices will act as a BehaviorSubject that notes any change in
  // in devices
  private metricDevices = new BehaviorSubject<IDevice[] | null>(null);
  private metricStart = new BehaviorSubject<string | null>(null);

  private metricEnd = new BehaviorSubject<string | null>(null);
  // metricDevices will act as a BehaviorSubject that notes any change in
  // in devices
  private metrics = new BehaviorSubject<IMetric[] | null>(null);


  // All selected items that can then be observed
  private selectedSystem = new BehaviorSubject<string | null>(null);
  private selectedMeasurement = new BehaviorSubject<string | null>(null);
  private selectedField = new BehaviorSubject<string | null>(null);
  private selectedDevice = new BehaviorSubject<string| null>(null);

  private selectedStart = new BehaviorSubject<string | null>(null);
  private selectedEnd = new BehaviorSubject<string | null>(null);

  //public fields
  sensorSystems: string[] = [];
  initialSystem: string;
  metricFields$():Observable<IMetricField[]> {
    return this.metricFields.asObservable();
  };

  metricMeasurements$():Observable<IMeasurement[]> {
    return this.metricMeasurements.asObservable();
  }
  metricDevices$():Observable<IDevice[]> {
    return this.metricDevices.asObservable();
  }

  metricStart$(): Observable<string> {
    return this.metricStart.asObservable();
  }

  metricEnd$(): Observable<string> {
    return this.metricEnd.asObservable();
  }

  metrics$():Observable<IMetric[]> {
    return this.metrics.asObservable();
  }

  // change selected items
  changeSelectedSystem(system:string | null) {
    this.selectedSystem.next(system);
  }

  changeSelectedMeasurement(measurement: string | null) {
    this.selectedMeasurement.next(measurement);
  }

  changeSelectedField(field: string) {
      this.selectedField.next(field);
  }
  changeSelectedDevice(device: string | null) {
    this.selectedDevice.next(device);
  }

  changeSelectedStart(start: string | null) {
    this.selectedStart.next(start);
  }

  changeSelectedEnd(end: string | null) {
    this.selectedEnd.next(end);
  }

  // return selected items
  selectedSystem$(): Observable<string> {
    return this.selectedSystem.asObservable();
  }
  selectedMeasurement$() : Observable<string> {
    return this.selectedMeasurement.asObservable();
  }
  selectedField$(): Observable<string> {
    return this.selectedField.asObservable();
  }
  selectedDevice$(): Observable<string> {
    return this.selectedDevice.asObservable();
  }

  selectedStart$(): Observable<string> {
    return this.selectedStart.asObservable();
  }

  selectedEnd$(): Observable<string> {
    return this.selectedEnd.asObservable();
  }

  constructor(private http:HttpClient, 
    private logService: LoggingService,
    private portalDataService: PortalDataService, 
    private influxService: InfluxService,
    private env: EnvironmentConfig) { 
      this.metricsURL = this.env.api.metrics;
    }

  /**
    * @returns Observable array of available measurements
  */
  getMeasurements(system:boolean): Observable<IMeasurement[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxShowMeasurements()
    }

    if (this.env.mock) {
      let mocks = this.mocks.measurements;
      return of(mocks)
      .pipe(
      tap( data => {
        this.uniqueSystem(data, system, this);
        this.metricMeasurements.next(data);
      }));
    }
    else {
      return this.http.get<IMeasurement[]>(`${this.metricsURL}`, {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        }),
        params
      })
        .pipe(
          tap(data => {
            this.uniqueSystem(data, system, this);
            this.metricMeasurements.next(data);
            this.logService.log(data, LogLevels.info);
          }))
    }
  }

  /**
   * @param field {string}
   * @returns Observable array of available metric fields
   */
  getMetricFields(field:string): Observable<IMetricField[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxShowFields(field)
    }
    if (this.env.mock) {
      let mocks = this.mocks.fields;
      return of(mocks).pipe(
        tap(data => {
          this.metricFields.next(data);
        }));
    }
    else {
      return this.http.get<IMetricField[]>(`${this.metricsURL}`, {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        }),
        params
      })
        .pipe(
          tap(data => {
            this.metricFields.next(data);
            this.logService.log(data, LogLevels.info);
          }));
    }
  }

  /**
   *
   * @param field {string} field to query for
   * @param measurement {string} which measurement to query
    * @param startTime {string} start time of query
   * @param endTime {string} end time of query
   * @returns Observable array of devices based on the measurement
   *  TODO: verify date format, this data type could change to
   *  possibly a number
   */
  getDevices(field:string, measurement:string,
    startTime: string, endTime: string): Observable<IDevice[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxDevices(field, measurement, startTime, endTime)
    }
    if (this.env.mock) {
      let mocks = this.mocks.devices;
      this.metricDevices.next(mocks);
      return of(mocks).pipe(
        map(devices => this.stripQuotes(devices))
      );
    }
    else {
      return this.http.get<IDevice[]>(`${this.metricsURL}`, {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        }),
        params
      })
        .pipe(
          map(devices => this.stripQuotes(devices)),
          tap(data => {
            this.metricDevices.next(data)
            this.logService.log(data, LogLevels.info);
          }));
    }
  }

  /**
   *
   * @param field {string} field to query for
   * @param measurement {string} which measurement to query
    * @param startTime {string} start time of query
   * @param endTime {string} end time of query
   * @param device {string} specific device to query against
   * @returns Observable array of devices based on the measurement
   */
  getMetrics(field:string, measurement:string,
    startTime: string, endTime: string, device: string): Observable<IMetric[]> {
    const params = {
      db: this.db,
      q: this.influxService.influxMetrics(field, measurement, startTime, endTime, device)
    }
    if (this.env.mock) {
      let mocks = this.mocks.metrics;
      return of(mocks).pipe(
        tap(data => {
          this.metrics.next(data);
        })
      );
    }
    else {
      return this.http.get<IMetric[]>(`${this.metricsURL}`, {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        }),
        params
      })
        .pipe(
          tap(data => {
            this.metrics.next(data)
            this.logService.log(data, LogLevels.info);
          }));
    }
  }

/**
 * @description intializes defaults graphs bases on first items in array
 * @returns observable
 * TODO: create constants for start & end times
 */
  getInitialGraph(system: string) {
    let field: string;
    let measurement: string;
    let start: string;
    let end: string;
    let initSys:boolean = system === null;
    return this.getMeasurements(initSys).pipe(
      flatMap(res => {
        // if measurement was captured in URL it will be saved into Observable here
        measurement = this.selectedMeasurement.value;
        // if measurement is null let's grab the first measurement from array of requests and select
        if (!measurement) {
          measurement = res[0].name;
          this.selectedMeasurement.next(measurement);
        }
        return this.getMetricFields(measurement);
      }),
      flatMap(res => {
        // select the first fieldKey so that we can query for devices
        // the query for devices requires any fieldkey that matches the measurement
        field = res[0].fieldKey;
        start = this.selectedStart.value || "24h";
        end = this.selectedEnd.value || "now()";
        // select this field and send to subscribers
        this.selectedField.next(field);
        return this.getDevices(field, measurement, start, end);
      }),
      flatMap(res => {
        // if devices was caputured in URL it will be saved into Observable here
        // if not select the first device from the returned requests
        let device = this.selectedDevice.value || new DeviceNamePipe().transform(res[0].device);
        // then we send this selected device ID to the subscribers
        this.selectedDevice.next(device);
        return this.getMetrics(field, measurement, start,
        end, device);
      })
    );
  }

  /**
   *
   * @param measurement array of measurements used to identify unique systems
   */
  private uniqueSystem(measurement:IMeasurement[], initSys:boolean, self:MetricsService): void {
    measurement.forEach(el => {
      let system = el.name.substring(0, el.name.indexOf("_"));
      const index = self.sensorSystems.findIndex((item) => item === system);
      if (index === -1) {
        self.sensorSystems.push(system);
      }
    });

    if (initSys) {
      this.initialSystem = self.sensorSystems[0];
      this.selectedSystem.next(this.initialSystem);
    }
  }

  /**
   *
   * @param devices array of devices that will be stripped from quotes
   */
  private stripQuotes(devices:IDevice[]): IDevice[] {
    devices.map((d) => {
      d.deviceLabel = new DeviceNamePipe().transform(d.deviceLabel);
      d.device = new DeviceNamePipe().transform(d.device);
    });
    return devices;
  }


}
