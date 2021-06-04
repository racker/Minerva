import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDropdownComponent } from './metric-dropdown.component';

describe('MetricGroupComponent', () => {
  let component: MetricDropdownComponent;
  let fixture: ComponentFixture<MetricDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
