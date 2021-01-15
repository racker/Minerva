import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetricsService } from '../../../../_services/metrics/metrics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MinervaApiService } from 'src/app/_services/minervaApi/minerva-api.service';

@Component({
  selector: 'app-visualize.page',
  templateUrl: './visualize.page.component.html',
  styleUrls: ['./visualize.page.component.scss']
})
export class VisualizePage implements OnInit, OnDestroy {

  
   system: string;
   measurement: string;
   device: string;
   start: string;
  end: string;

  public fields
  loading: boolean;
  subManager = new Subscription();

  constructor(private metricService: MetricsService, private router: Router,
    private route: ActivatedRoute, private mnrvaApi: MinervaApiService) { }

  async ngOnInit() {

    this.loading = true;
    // this.mnrvaApi.getDemo().subscribe(data =>{
    //   console.log(data);
    // })
    this.system = this.route.snapshot.queryParams['system'] ?
      this.route.snapshot.queryParams['system'].toUpperCase() : null;
    this.measurement = this.route.snapshot.queryParams['measurement'];
    this.device = this.route.snapshot.queryParams['device'];
    this.start = this.route.snapshot.queryParams['start'];
    this.end = this.route.snapshot.queryParams['end'];

    // if there are URL parameters for these properties, notify the service
    this.metricService.changeSelectedSystem(this.system);
    this.metricService.changeSelectedMeasurement(this.measurement);
    this.metricService.changeSelectedDevice(this.device);
    this.metricService.changeSelectedStart(this.start);
    this.metricService.changeSelectedEnd(this.end);

    // being setup for the default graphs
    this.metricService.getInitialGraph(this.system).subscribe();

    // susbscribe to the user selected items and update URL accordingly
    let systemSub = this.metricService.selectedSystem$().subscribe((system) => {
      if (system) {
        this.system = system;
        this.updateQueryParams();
      }
    });

    let measurementSub = this.metricService.selectedMeasurement$().subscribe((measurement) =>
    {
      if (measurement) {
        this.measurement = measurement;
        this.updateQueryParams();
      }
    });

    let deviceSub = this.metricService.selectedDevice$().subscribe((device) => {
      if (device) {
        this.device = device;
        this.updateQueryParams();
      }
    });

    // add all subscriptions to one manager for cleaner organization
    this.subManager.add(systemSub);
    this.subManager.add(measurementSub);
    this.subManager.add(deviceSub);
  }

  ngOnDestroy() {
    // unsubscribe all subscriptions from the manager
    this.subManager.unsubscribe();
  }

  /**
   * @description this function updates the URL query params
   * @return {void}
   */
  private updateQueryParams() {
    const params = {
      ...(this.system  && { system: this.system }),
      ...(this.measurement && { measurement : this.measurement }),
      ...(this.device && {device: this.device}),
      ...(this.start && { start: this.start }),
      ...(this.end && {end: this.end })
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}