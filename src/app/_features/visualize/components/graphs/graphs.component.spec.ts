import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeRangeComponent } from '@minerva/_features/visualize/components/timerange/timerange.component';
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

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;

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
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          root: {
            routeConfig : routes[0]
          }
        },
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set inputs', () => {
    expect(component.start).toBeUndefined();
    expect(component.end).toBeUndefined();
    expect(component.duration).toBeUndefined();
  });

});
