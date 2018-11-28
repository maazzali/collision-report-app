import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import 'd3-transition';
import { event, select } from 'd3-selection';
import { scaleTime } from 'd3-scale';
import { drag } from 'd3-drag';
import { axisBottom } from 'd3-axis';

const range = require('lodash/range');

@Component({
  selector: 'app-collision-report-slider',
  templateUrl: './collision-report-slider.component.html',
  styleUrls: ['./collision-report-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollisionReportSlideComponent implements OnInit, AfterViewInit {
  @Input('data') public data: Date[] = [];
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
    if (!this.data.length || !this.startTime || !this.endTime) {
      return;
    }

    const height: number = this.el.clientHeight;
    const width: number = this.el.clientWidth;
    const handleRadius = 9;
    const graphMargin: any = { top: 0, right: 25, bottom: 0, left: 25 };
    const graphWidth: number = width - graphMargin.left - graphMargin.right - 50;
    const graphHeight: number = height - graphMargin.top - graphMargin.bottom;

    const timeList: Date[] = this.data;
    const timeMin: Date = new Date(Math.min.apply(null, timeList));
    const timeMax: Date = new Date(Math.max.apply(null, timeList));
    const timeDelta = timeMax.getTime() - timeMin.getTime();
    const timeRange: Date[] = range(timeMin.getTime(), timeMax.getTime(), (timeDelta) / 5).map((t) => (new Date(t)));
    // TODO:: lodash range is missing the last value because it cannot accommodate it.
    // TODO:: Using this hack
    timeRange.push(timeList[timeList.length - 1]);

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
      .attr('transform', `translate(${graphMargin.left}, ${graphHeight / 2})`);

    const sliderLine = slider.append('line')
      .attr('class', 'track')
      .attr('x1', xRange.range()[0])
      .attr('x2', xRange.range()[1])
    ;

    slider.append('line')
      .attr('class', 'highlight-line')
      .attr('x1', xRange(this.startTime.getTime()))
      .attr('y1', 0)
      .attr('x2', xRange(this.endTime.getTime()))
      .attr('y2', 0)
    ;

    const trackInset = sliderLine.select((function () {return this.parentNode.appendChild(this.cloneNode(true)); }) as any)
      .attr('class', 'track-inset');

    const trackOverlay = trackInset.select((function () {return this.parentNode.appendChild(this.cloneNode(true)); }) as any)
      .attr('class', 'track-overlay')
      .call(drag()
        .on('start.interrupt', () => slider.interrupt())
        .on('start drag', () => handleContainer
          .attr('transform', `translate(${xRange(xRange.invert((event).x))}, 0)`)));

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
      .attr('xlink:href', '#slider-ico-handle')
      .attr('r', handleRadius);

    const rightMostTickText = select(this.el.querySelector('.ticks > .tick:last-of-type > text'));
    rightMostTickText.attr('x', '-17');

    const leftMostTickText = select(this.el.querySelector('.ticks > .tick:first-of-type > text'));
    leftMostTickText.attr('x', '17');
  }

}
