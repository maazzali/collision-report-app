import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

// interface DataPoint {
//
// }

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input('data') public data: Array<any> = [];
  private el: HTMLElement;

  constructor(elRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.el = elRef.nativeElement;
  }

  @HostListener('window:resize')
  public onResize() {
    this.drawGraph();
  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    this.drawGraph();
  }

  private drawGraph() {
    const height = this.el.clientHeight;
    const width = this.el.clientWidth;

    console.log('height', 'width', height , width);
  }

}
