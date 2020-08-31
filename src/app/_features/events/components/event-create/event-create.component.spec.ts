import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateComponent } from './event-create.component';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';
import { SharedModule } from 'src/app/_shared/shared.module';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreateComponent ],
      providers: [MonitorService],
      imports:[SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
