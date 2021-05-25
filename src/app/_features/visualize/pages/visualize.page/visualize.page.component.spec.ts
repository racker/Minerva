import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualizePage } from './visualize.page.component';
import { ActivatedRoute } from '@angular/router';
import { MetricsService } from 'src/app/_services/metrics/metrics.service';
import { SharedModule } from '../../../../_shared/shared.module';
import { By } from '@angular/platform-browser';
import { envConfig, EnvironmentConfig } from 'src/app/_services/config/environmentConfig.service';
import { of } from 'rxjs';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }, {
    queryParams: {
      duration: '12HR',
      start: '328833',
      end: '8829938'
    }
  }
];

describe('VisualizePage', async() => {
  let injector: TestBed;
  let component: VisualizePage;
  let fixture: ComponentFixture<VisualizePage>;
  let metricService: MetricsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        VisualizePage
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          queryParams: of(routes[1].queryParams),
          root: {
            routeConfig : routes[0]
          }
        }
      },
      {
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
    }],
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
      fixture = TestBed.createComponent(VisualizePage);
      injector = getTestBed();
    component = fixture.componentInstance;
    metricService = injector.inject(MetricsService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set presets of visualize.date', () => {
    expect(component.visualize.date.start.toString()).toEqual(routes[1].queryParams.start);
    expect(component.visualize.date.end.toString()).toEqual(routes[1].queryParams.end);
    expect(component.visualize.date.duration.toString()).toEqual(routes[1].queryParams.duration);
  });



});
