import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeRangeComponent } from '@minerva/_features/visualize/components/timerange/timerange.component';
import { MetricsService } from '@minerva/_services/metrics/metrics.service';
import { HedwigGraphComponent } from '@minerva/_shared/components/hedwig-graph/hedwig-graph.component';

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
        HedwigGraphComponent,
        TimeRangeComponent
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
      }]
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

/*
  it('should set inputs', () => {
    expect(component.start).toBeUndefined();
    expect(component.end).toBeUndefined();
    expect(component.duration).toBeUndefined();
  });
  */
});
