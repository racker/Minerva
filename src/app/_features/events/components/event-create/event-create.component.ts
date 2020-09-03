import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorService } from 'src/app/_services/monitors/monitor.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {

  constructor(public monService: MonitorService) { 
   
  }
}
