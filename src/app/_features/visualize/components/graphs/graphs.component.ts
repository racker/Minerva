import { Component, Input, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/_services/favorites/favorites.service';

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
  query_string: string;

  constructor(private favService:FavoritesService) { }

  ngOnInit() {
    this.data = JSON.stringify([{
      mean: 0.99,
      time: "2018-11-24T18:58:21Z"
    },
    {
      mean: 0.67,
      time: "2018-11-25T23:58:21Z"
    },
    {
      mean: 0.33,
      time: "2018-11-26T02:58:21Z"
    },
    {
      mean: 0.45,
      time: "2018-11-27T18:58:21Z"
    },
    {
      mean: 0.10,
      time: "2018-11-28T23:58:21Z"
    },
    {
      mean: 0.89,
      time: "2018-11-29T02:58:21Z"
  }]);
  }

  addToFavorite() {

    this.query_string = 'http://localhost:8080/api/query?metricName=ifHCOutUcastPkts_ifHCOutUcastPkts&tag=resource=828315&start=4d-ago';

    this.favService.addToFavorites(this.query_string)
         .subscribe(data => {
           console.log("data ", data);
         })

  }

}
