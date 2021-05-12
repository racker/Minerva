import { Component, OnInit } from '@angular/core';
import { formatMultipleData } from "@minerva/_shared/utils";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  data: any;
  group:any;
  constructor() { }

    /**
     * Below is the case for multiline in case you pass metricName. for e.g - cpu_idle 
     * 
     */
  ngOnInit() {


        // GET http://localhost:8080/api/query?metricName=cpu_idle&tag=os=linux&start=2020-08-23T17:53:00Z&end=2020-08-23T17:54:40ZX-Auth-Token: abcX-Tenant: t-1

        var dt = [
          {
            "tenant": "t-1",
            "metricName": "cpu_idle",
            "tags": {
              "host": "h-1",
              "os": "linux",
              "deployment": "prod",
              "metricGroup": "cpu"
            },
            "values": {
              "2020-08-24T00:13:16Z": 491.0,
              "2020-08-24T00:13:20Z": 792.0,
              "2020-08-24T00:13:21Z": 824.0
            }
          },
          {
            "tenant": "t-1",
            "metricName": "cpu_idle",
            "tags": {
              "host": "h-3",
              "os": "windows",
              "deployment": "dev",
              "metricGroup": "cpu"
            },
            "values": {
              "2020-08-24T00:15:52Z": 84.0,
              "2020-08-24T00:15:55Z": 498.0
            }
          },
          {
            "tenant": "t-1",
            "metricName": "cpu_idle",
            "tags": {
              "host": "h-2",
              "os": "123",
              "deployment": "staging",
              "metricGroup": "cpu"
            },
            "values": {
              "2020-08-24T00:15:52Z": 90.0,
              "2020-08-24T00:15:55Z": 300.0
            }
          },
          {
            "tenant": "t-1",
            "metricName": "cpu_idle",
            "tags": {
              "host": "h-4",
              "os": "abc",
              "deployment": "prod",
              "metricGroup": "cpu"
            },
            "values": {
              "2020-08-24T00:15:52Z": 95.0,
              "2020-08-24T00:15:55Z": 136.0
            }
          }
        ];

          this.data = formatMultipleData(dt);
          this.data = JSON.stringify(this.data);
  }
}
