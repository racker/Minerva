import { Component, OnInit, Input } from '@angular/core';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { IMeasurement, IMetricField, IDevice } from '@minerva/_models/metrics';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-visualize-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  // values from attributes of component
  @Input() system: string;
  @Input() measurement: string;
  @Input() device: string;
  @Input() start: string;
  @Input() end: string;

  // public fields
  measurements: IMeasurement[];
  selectedFields: IMetricField[];
  selectedDevices: IDevice[];
  selectedField: string;
  filteredMeasurements: IMeasurement[];

  // manage subscriptions
  subManager = new Subscription();

  // TODO: Link the start & end dates to right column widget
  private readonly startConst: string = '6h';
  private readonly endConst: string = 'now()';

  // getters will allow for binding values
  get systems(): string[] {
    return this.metricService.sensorSystems;
  }
  get initialSys(): string {
    return this.metricService.initialSystem;
  }

  constructor(private metricService: MetricsService) { }

  ngOnInit() {
    // susbscribe to the collections from metrics service
    let subMeasurements = this.metricService.metricMeasurements$().subscribe(
      (measurements) => {
        if (measurements) {
          this.measurements = measurements;
          this.filterMeasurements(measurements);
        }
    });

    let subDevices = this.metricService.metricDevices$().subscribe(
      devices => this.selectedDevices = devices
    );

    let subField = this.metricService.selectedField$().subscribe(
      field => this.selectedField = field
    );

    // consolidate all subscriptions to one for cleaner management
    this.subManager.add(subMeasurements);
    this.subManager.add(subDevices);
    this.subManager.add(subField);
  }

  /**
   * @description function for behavior once system is selected
   * @param {string} system represents chosen system
   * @returns void
   */
  selectSystem(system:string): void {
    this.system = system;
    this.filterMeasurements(this.measurements);
    this.metricService.changeSelectedSystem(system);
    this.selectMeasurement(this.filteredMeasurements[0]);
  };

  /**
   * @description function for behavior once measurement selected
   * @param {IMeasurement} measurement
   */
  selectMeasurement(measurement: IMeasurement): void {
    this.measurement = measurement.name;
    // based on the selected metric we want to get the fields associated and the devices
    this.metricService.getMetricFields(this.measurement).pipe(
      flatMap(fields => {
        this.selectedFields = fields;
        return this.metricService.getDevices(fields[0].fieldKey, this.measurement,
          this.startConst, this.endConst);
      })
    ).subscribe();
    this.metricService.changeSelectedMeasurement(this.measurement);
  };

  /**
   * @description function for behavior once device is selected
   * @param {any} event select event
   */
  selectDevice(event:any): void {
    this.device = event.target.value;
    let field = (this.selectedField || this.selectedFields[0].fieldKey)
    this.metricService.getMetrics(field, this.measurement, this.startConst, this.endConst,
    this.device).subscribe();
    this.metricService.changeSelectedDevice(this.device)
  }

  /**
   * @name filterMeasurements
   * @param {IMeasurement[]} measurements an array of Imeasurement[]
   * @returns void
   */
  private filterMeasurements(measurements:IMeasurement[]):void {
    // get the system either from attribute or from the assigned default
    let sys = this.system || this.initialSys;
    let selected = measurements.filter((measurement: IMeasurement) => {
      return measurement.name.substring(0, measurement.name.indexOf("_")) ==
        sys;
    });
    this.filteredMeasurements = selected;
  }

  ngOnDestroy(): void {
    this.subManager.unsubscribe();
  }
}
