import { Component, OnInit } from '@angular/core';
import { TenantMetadata} from "../../../../../_model/tenantMetadata";

@Component({
  selector: 'app-tenant-metadata-list',
  templateUrl: './tenant-metadata-list.component.html',
  styleUrls: ['./tenant-metadata-list.component.scss']
})
export class TenantMetadataListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // todo Remove it once service is added
  array(size){
    return Array(size);
  }

}
