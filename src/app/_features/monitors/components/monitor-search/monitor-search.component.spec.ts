import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MonitorSearchComponent } from './monitor-search.component';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { Monitors, Monitor } from 'src/app/_models/monitors';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { monitorsMock } from 'src/app/_mocks/monitors/monitors.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('MonitorSearchComponent', () => {
  let injector: TestBed;
  let monitorsService: MonitorService;
  let component: MonitorSearchComponent;
  let fixture: ComponentFixture<MonitorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSearchComponent ],
      providers : [ MonitorService ],
      imports: [ HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    injector = getTestBed();
    monitorsService = injector.get(MonitorService);
    fixture = TestBed.createComponent(MonitorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults', () => {
    expect(component.searchMonitors).toBeDefined();
    expect(component.placeholder).toBe("");
    expect(component.monitorSearchResults).toEqual(new EventEmitter<Monitors>());
    expect(component.resetResults).toEqual(new EventEmitter<{}>());
    expect(component.searching).toEqual(new EventEmitter<boolean>());
 });
 xit('should make search for monitors text input results', (done) => {
   component.monitorSearchResults.next((new monitorsMock()).collection);
    component.monitorSearchResults.subscribe((monitors: Monitors) => {
      expect(monitors.content.length).toBeGreaterThan(2);
      done();
    });
  });

  it('should emit dismiss of search', () => {
    let spy = spyOn(component.resetResults, 'emit');
    component.reset();
    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe upon component destroy', () => {
    let spy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

});
