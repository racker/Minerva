import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_INITIALIZER } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { envConfig, EnvironmentConfig } from '@minerva/_services/config/environmentConfig.service';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { HedwigGraphComponent } from '@minerva/_shared/components/hedwig-graph/hedwig-graph.component';
import { default as metrics } from '@minerva/_mocks/metrics/metrics.json';
import { GraphsComponent } from './graphs.component';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }
];

describe('GraphingComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;
  let metricService: MetricsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GraphsComponent,
        HedwigGraphComponent
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        MetricsService,
        {
        provide: ActivatedRoute,
        useValue: {
          root: {
            routeConfig : routes[0]
          }
        },

      },
      {
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
      }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    metricService = TestBed.inject(MetricsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define JSON', () => {
    expect(component.JSON).toEqual(JSON);
  });

  it('should assign metrics$ to getMetricsDataPoints() observable', () => {
    expect(component.metrics$).toEqual(metricService.getMetrics$());
  });

});
