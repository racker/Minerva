import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroResultsComponent } from './zero-results.component';

describe('ZeroResultsComponent', () => {
  let component: ZeroResultsComponent;
  let fixture: ComponentFixture<ZeroResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZeroResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
