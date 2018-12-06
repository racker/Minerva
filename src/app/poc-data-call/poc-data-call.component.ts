import { Component, OnInit } from '@angular/core';
import { PocApiCallService } from '../poc-api-call.service';
import { CpuMaxUsage } from '../../../node_modules/hedwig/dist/hedwig-main.esm';
import { LoggingService } from '../logging.service';
import { LogLevels } from '../log-levels.enum';

@Component({
  selector: 'app-poc-data-call',
  templateUrl: './poc-data-call.component.html',
  styleUrls: ['./poc-data-call.component.less']
})
export class PocDataCallComponent implements OnInit {
  logger = new LoggingService();
  marshalledData : any;
  constructor( private apiCall:PocApiCallService) {
    new CpuMaxUsage();
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.fetchData();

  }

  fetchData(){
    this.logger.log('Fetching data', this.logger.logLevels.info);
    this.apiCall.post({ "queryString":  "select * from agent_cpu where time > now() - 5m" })
    .subscribe(response => this.dataMarshaller(response));
  }

  dataMarshaller(data: any) {
    let valuesArray = [];
    this.logger.log({ message: 'returned data', data: data }, 1);
    for (let index in data[0].valuesCollection) {
      valuesArray.push({ time: data[0].valuesCollection[index][0], cpu_max_usage: data[0].valuesCollection[index][8] });
    }
    this.marshalledData = JSON.stringify(valuesArray);
    this.logger.log(this.marshalledData, LogLevels.debug);
    this.logger.log('Finished marshalling data', 1);
  }
}
