import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

   event={
    "id": "1e2434f5-439d-42b5-aa3b-870aefd1b1e1",
    "name": "cpu",
    "measurement": "cpu",
    "taskParameters": {
      "criticalStateDuration": 2,
      "warningStateDuration": null,
      "infoStateDuration": null,
      "stateExpressions": [
        {
          "expression": {
            "type": "comparison",
            "comparator": "<",
            "valueName": null,
            "comparisonValue": 3
          },
          "state": "CRITICAL",
          "message": "critical threshold was hit"
        }
      ],
      "customMetrics": null,
      "windowLength": null,
      "windowFields": null,
      "flappingDetection": false,
      "labelSelector": {
        "agent_environment": "localdev"
      }
    },
    "createdTimestamp": "2020-08-07T16:41:03Z",
    "updatedTimestamp": "2020-08-07T16:41:03Z"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
