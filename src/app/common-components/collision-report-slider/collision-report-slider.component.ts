import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import 'd3-transition';
import { select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { axisBottom } from 'd3-axis';

const range = require('lodash/range');

@Component({
  selector: 'app-collision-report-slider',
  templateUrl: './collision-report-slider.component.html',
  styleUrls: ['./collision-report-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollisionReportSlideComponent implements OnInit, AfterViewInit {
  @Input('movingStates') public movingStates: Date[] = [];
  @Input('startTime') public startTime = null;
  @Input('endTime') public endTime = null;
  private el: HTMLElement;

  constructor(elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }

  @HostListener('window:resize')
  public onResize() {
    select(this.el.querySelector('.slider-container')).selectAll('*').remove();
    this.drawSlider();
  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    setTimeout(() => this.drawSlider(), 500);
  }

  private drawSlider() {
    if (!this.movingStates.length || !this.startTime || !this.endTime) {
      return;
    }

    const height: number = this.el.clientHeight;
    const width: number = this.el.clientWidth;
    const handleRadius = 9;
    const graphMargin: any = { top: 0, right: 25, bottom: 0, left: 25 };
    const graphWidth: number = width - graphMargin.left - graphMargin.right - 40;
    const graphHeight: number = height - graphMargin.top - graphMargin.bottom;

    const timeMin: Date = this.startTime;
    const timeMax: Date = this.endTime;
    const timeDelta = timeMax.getTime() - timeMin.getTime();
    const timeRange: Date[] = range(timeMin.getTime(), timeMax.getTime(), (timeDelta) / 5).map(r => (new Date(r)));
    timeRange.push(timeMax);

    const xRange = scaleTime()
      .domain([timeMin, timeMax])
      .range([0, graphWidth])
      .clamp(true)
    ;

    const formatDate = (d: any): string => {
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${hours}:${minutes} ${ampm}`;
    };

    const xAxis = axisBottom(xRange)
      .tickValues(timeRange)
      .tickFormat((date) => formatDate(date))
      .tickPadding(-21)
      .tickSizeInner(-5)
    ;

    const sliderContainer = select(this.el.querySelector('.slider-container'))
    ;

    const sliderWrapper = sliderContainer.append('g')
      .attr('class', 'slider-wrapper')
      .attr('transform', `translate(${graphMargin.left},${graphMargin.top})`)
    ;

    sliderWrapper.append('g')
      .attr('class', 'x-axis-text')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', -(graphHeight / 2))
      .style('text-anchor', 'middle')
      .text('Location')
    ;
    const slider = sliderWrapper.append('g')
      .attr('class', 'slider')
      .attr('transform', `translate(${graphMargin.left}, ${(graphHeight / 2) + 5})`);

    const sliderLine = slider.append('line')
      .attr('class', 'track')
      .attr('x1', xRange.range()[0])
      .attr('x2', xRange.range()[1])
    ;

    this.movingStates.forEach((pointTime) => {
      slider
        .append('rect')
        .attr('class', 'moving-state')
        .attr('x', xRange(pointTime))
        .attr('y', 0)
        .attr('width', 6)
        .attr('height', 6)
      ;
    });

    const trackInset = sliderLine.select((function () {return this.parentNode.appendChild(this.cloneNode(true)); }) as any)
      .attr('class', 'track-inset');

    slider.insert('g', '.track-overlay')
      .attr('class', 'ticks')
      .attr('transform', `translate(0, 0)`)
      .call(xAxis)
    ;

    const iconWidth = 10;
    const iconHeight = 10;
    const handleContainer = slider.insert('g', '.track-overlay')
      .attr('class', 'handle')
      .attr('transform', `translate(0, 0)`);
    const handler = handleContainer.append('use')
      .attr('x', -iconWidth)
      .attr('y', -iconHeight)
      .attr('transform', `translate(${xRange(this.endTime)}, 0)`)
      .attr('xlink:href', '#slider-ico-handle')
      .attr('r', handleRadius);

    const rightMostTickText = select(this.el.querySelector('.ticks > .tick:last-of-type > text'));
    rightMostTickText.attr('x', '-17');

    const leftMostTickText = select(this.el.querySelector('.ticks > .tick:first-of-type > text'));
    leftMostTickText.attr('x', '17');
  }

}
