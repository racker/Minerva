import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourcesService } from '../../../../_services/resources/resources.service';

@Component({
  selector: 'app-resource-details.page',
  templateUrl: './resource-details.page.html',
  styleUrls: ['./resource-details.page.scss']
})
export class ResourceDetailsPage implements OnInit {
  id: number;
  meta: {};
  //TODO: create Interface for a single Resource - will be mapped to
  // service & response
  resource: any = {};
  Object: Object = Object;

  constructor(private route: ActivatedRoute, private resourceService: ResourcesService) { }

  // TODO: attempt to move this logic to a route resolve as opposed
  // to making the request within the component
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      // this.resourceService.getResource(this.id).subscribe(data => {
      //   this.resource = data.content[0];
      // });
    });
  }

}
