import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HedwigGraphComponent } from './hedwig-graph.component';
import { LineGraph } from 'hedwig-monitoring-library';
import { default as metrics } from '@minerva/_mocks/metrics/metrics.json';

describe('HedwigGraphComponent', () => {
  let component: HedwigGraphComponent;
  let fixture: ComponentFixture<HedwigGraphComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HedwigGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HedwigGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.fieldName).toBeUndefined();
    expect(component.height).toBeUndefined();
    expect(component.width).toBeUndefined();
    expect(component.type).toBeUndefined();
    expect(component.data).toBeUndefined();
    expect(component.lineGraph).toEqual(LineGraph);
  });


  /**
   * TODO: Test whether this.lineGraph() is instantiated
  it('should execute LineGraph() class', () => {
    spy = spyOn(component, 'lineGraph');
    new HedwigGraphComponent();
    expect(spy).toHaveBeenCalled();
  });
  */
});
