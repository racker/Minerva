import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../../_shared/shared.module';
import { metricMocks } from '../../../../_mocks/metrics/metrics.service.mock';
import { SelectionsComponent } from './selections.component';
import { IMeasurement, IMetricField } from 'src/app/_models/metrics';
import { MetricsService } from 'src/app/_services/metrics/metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';

describe('SelectionsComponent', () => {
  let component: SelectionsComponent;
  let fixture: ComponentFixture<SelectionsComponent>;
  let metricService: MetricsService;
  let mocks = new metricMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SelectionsComponent ],
      providers: [ MetricsService,  {
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
    } ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SelectionsComponent);
    component = fixture.componentInstance;
    metricService = TestBed.get(MetricsService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default getters & Inputs', () => {
    expect(component.systems).toEqual(metricService.sensorSystems);
    expect(component.initialSys).toEqual(metricService.initialSystem);
    expect(component.system).toBeUndefined();
    expect(component.measurement).toBeUndefined();
    expect(component.device).toBeUndefined();
    expect(component.start).toBeUndefined();
    expect(component.end).toBeUndefined();
  });

  it('should have added all Behaviors to the Subscriptions', () => {
    spyOn(component.subManager, 'add');
    component.ngOnInit();
    expect(component.subManager.add).toHaveBeenCalledTimes(3);
  });

  it('should select system and set value', () => {
    component.measurements = mocks.measurements;
    component.selectSystem('MAAS');
    expect(component.system).toEqual('MAAS');
  });

  it('should filter measurements based on selected system', () => {
    component.measurements = mocks.measurements;
    let filtered = component.measurements.filter((measurement: IMeasurement) => {
      return measurement.name.substring(0, measurement.name.indexOf("_")) ==
      'MAAS';
    });
    component.selectSystem('MAAS');
    expect(component.filteredMeasurements).toEqual(filtered);
  });

  it('should select a device', () => {
    let value = ({
      target: {
        value: '8773663'
      }
    });
    component.selectedField = 'available'
    component.selectDevice(value);
    expect(component.device).toEqual(value.target.value);
  });

  it('should after selecting measurement, update field subscription', () => {
    let subFields: IMetricField[];
    const measurement = <IMeasurement>{
      name: 'MAAS_http'
    };
    metricService.metricFields$().subscribe(
      fields => subFields = fields
    );
    component.selectMeasurement(measurement);
    expect(subFields).toEqual(mocks.fields);

  });

  it('should unsubscribe once component is destroyed', () => {
    spyOn(component.subManager, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subManager.unsubscribe).toHaveBeenCalled();
  });

});
