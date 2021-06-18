import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimeRangeComponent } from './timerange.component';
import { ActivatedRoute, Router } from '@angular/router';

const routes = [
  {
    path: 'visualize',
    data: {
      breadcrumb: 'GRAPHS'
    }
  }
];

describe('TimerangeComponent', () => {
  let component: TimeRangeComponent;
  let router: Router;
  let fixture: ComponentFixture<TimeRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TimeRangeComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          root: {
            routeConfig : routes[0]
          }
        },
      }],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeComponent);
    component = fixture.componentInstance;
    component.start = new Date('2021-05-05T00:42:10.000Z');
    component.end = new Date('2021-05-21T00:42:15.000Z');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set date.start to input', () => {
    expect(component.date.start).toEqual(component.start);
  });
  it('should set date.end to input', () => {
    expect(component.date.end).toEqual(component.end);
  });

  it('should set date.presets to false', () => {
    expect(component.date.presets).toEqual(false);
  });

  it('should update duration onDurationChange()', () => {
    let spy=spyOn(component.timeRangeEmitter, 'emit')
    component.onDurationChange({value: 'stuffyea'});
    expect(component.date.start).toBe(null);
    expect(component.date.end).toBe(null);
    expect(spy).toHaveBeenCalled();

  });

  it('should update query params on updateNavigation()', () => {
    let spy=spyOn(component.timeRangeEmitter, 'emit')
    component.onDurationChange({value: 'stuffyea'})
    expect(spy).toHaveBeenCalled();
  });

  it('should check if isValidDate() returns false', () => {
    expect(component.isValidDate('56')).toEqual(false);
  });

  it('should check if isValidDate() returns true', () => {
    expect(component.isValidDate(new Date('2021-05-05T00:42:10.000Z'))).toEqual(true);
  })

});
