import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MonitorsPage } from './monitors.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MonitorsPage', () => {
  let component: MonitorsPage;
  let fixture: ComponentFixture<MonitorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MonitorsPage ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MonitorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(MonitorsPage);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
