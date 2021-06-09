import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  @Input() start:string;
  @Input() end:string;
  @Input() duration: string;

  data: string;

  constructor() { }

  ngOnInit(): void {
  }

}
