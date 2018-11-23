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

import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleTime } from 'd3-scale';
import 'd3-transition';
import { curveMonotoneX, line } from 'd3-shape';
import { select } from 'd3-selection';

interface DataPoint {
  value: number;
  time: Date;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input('data') public data: DataPoint[] = [];
  private el: HTMLElement;

  constructor(elRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.el = elRef.nativeElement;
  }

  @HostListener('window:resize')
  public onResize() {
    select('#line-chart').selectAll('*').remove();
    this.drawGraph();
  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    this.drawGraph();
  }

  private drawGraph() {
    if (!this.data.length) {
      return;
    }

    const height: number = this.el.clientHeight;
    const width: number = this.el.clientWidth;
    const margin: any = { top: 25, right: 25, bottom: 25, left: 25 };
    const graphWidth: number = width - margin.left - margin.right;
    const graphHeight: number = height - margin.top - margin.bottom;

    const timeList: Date[] = this.data.map((d: any) => d.time);
    const timeMin: Date = new Date(Math.min.apply(null, timeList));
    const timeMax: Date = new Date(Math.max.apply(null, timeList));
    const timeRange: Date[] = [timeMin, new Date(((timeMax.getTime() - timeMin.getTime()) / 2) + timeMin.getTime()), timeMax];

    const xRange = scaleTime()
      .range([0, graphWidth])
    ;
    xRange
      .domain([timeMin, timeMax])
    ;
    const xAxis = axisBottom(xRange)
      .tickValues(timeRange)
    ;

    const yRange = scaleLinear()
      .range([graphHeight, 0])
    ;
    yRange
      .domain([0, 80])
    ;
    const yAxis = axisLeft(yRange)
      .ticks(9)
      .tickSize(-graphWidth)
    ;

    const valueLine: any = line()
      .x((d: any) => xRange(d.time))
      .y((d: any) => yRange(d.value))
      .curve(curveMonotoneX)
    ;

    const svg = select('#line-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const graphContainer = svg.append('g')
      .attr('class', 'line-chart')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    ;

    graphContainer.append('g')
      .append('text')
      .attr('class', 'y-axis-label label-text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', -(graphHeight / 2))
      .style('text-anchor', 'middle')
      .text('Speed (mph)')
    ;

    const graph = graphContainer.append('g')
      .attr('transform', `translate(25,0)`);


    const formatDate = (d: any): string => {
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      return [year, month, day].join('-');
    };
    graph.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${graphHeight})`)
      .call(xAxis.tickFormat((date) => formatDate(date)))
    ;

    graph.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    ;

    graph.append('path')
      .attr('id', 'value-line')
      .attr('class', 'line')
      .attr('stroke-linecap', 'round')
      .attr('d', valueLine(this.data))
    ;
  }

}
