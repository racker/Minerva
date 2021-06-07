import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-metric-dd',
  templateUrl: './metric-dropdown.component.html',
  styleUrls: ['./metric-dropdown.component.scss']
})
export class MetricDropdownComponent implements OnInit {

  @Input() ddlist: string[];
  @Input() defalutSelection: string;
  @Input() pillConcat: boolean;
  @Output() emitedValue: EventEmitter<any> = new EventEmitter();
  @Output() dismissPill: EventEmitter<any> = new EventEmitter();

  @Input() pills = new Set();
  constructor() { }

  ngOnInit(): void {
  }

  defaultgroup(item) {
    if (!!this.defalutSelection && this.defalutSelection === item)
      return true;
  }

  /**
   * Metric group selection
   * @param group name of group
   */
  public ddSelection(group) {
    if (!!group) {
      // new Instance while group selection
      if (!this.pillConcat) {
        this.pillsReset();
      }
      this.pills.add(group);
      this.emitedValue.emit(group);
    }
  }


  public pillsReset() {
    this.pills = new Set();
  }
  pillDismiss(data) {
    this.pills.delete(data);
    this.dismissPill.emit(data);
  }
}
