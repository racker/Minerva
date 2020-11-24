import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-zero-results',
  templateUrl: './zero-results.component.html',
  styleUrls: ['./zero-results.component.scss']
})
export class ZeroResultsComponent implements OnInit {

  @Input() message: string;
  @ViewChild('template', { static: true}) template;
  constructor(
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

}
