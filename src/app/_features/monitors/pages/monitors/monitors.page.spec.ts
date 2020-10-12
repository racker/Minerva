import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MonitorsPage } from './monitors.page';

describe('MonitorsPage', () => {
  let component: MonitorsPage;
  let fixture: ComponentFixture<MonitorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MonitorsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
