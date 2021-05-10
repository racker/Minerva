import { Component, Input, OnInit } from '@angular/core';
import { LineGraph } from 'hedwig-monitoring-library';


/**
 * To use the component add like so:
 * <app-hedwig-graph fieldName="usage_average" width="300" height="600"
type="MAAS_cpu" [data]="data"></app-hedwig-graph>
 */

@Component({
  selector: 'app-hedwig-graph',
  templateUrl: './hedwig-graph.component.html',
  styleUrls: ['./hedwig-graph.component.scss']
})
export class HedwigGraphComponent implements OnInit {


  @Input() fieldName: string;
  @Input() width: number;
  @Input() height: number;
  @Input() type: string;
  @Input() data: string;

  lineGraph: LineGraph = LineGraph;

  constructor() {  }

  ngOnInit(): void {
    new this.lineGraph();
  }
}
