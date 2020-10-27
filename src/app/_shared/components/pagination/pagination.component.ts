import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EnvironmentConfig } from 'src/app/_services/featureConfig/environmentConfig.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() page: number;
  @Input() total: number;
  @Input() perPage: number;
  // loading indicator can be added here
  //@Input() loading: boolean;
  @Input() pagesToShow: number;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor(private env: EnvironmentConfig) { }

  getMin(): number {
    return ((this.perPage * (this.page + 1)) - this.perPage) + 1;
  }

  getMax(): number {
    let max = this.perPage * (this.page + 1);
    if (max > this.total) {
      max = this.total;
    }
    return max;
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }

  totalPages(): number {
    return Math.ceil(this.total / this.perPage) || 0;
  }

  lastPage(): boolean {
    return this.perPage * (this.page + 1) > this.total;
  }

  getPages(): number[] {
    const c = Math.ceil(this.total / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || this.env.pagination.pageSize;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

}
