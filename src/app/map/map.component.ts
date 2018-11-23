import * as $ from 'jQuery';
import * as _ from 'lodash';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  OnInit,
} from '@angular/core';
import { createMap, gmapsLoadPromise } from '../lib/google-maps';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Output() public onClick = new EventEmitter();
  @Output() public onZoomChanged = new EventEmitter();
  public createMapPromise: any;
  public markerPromiseList = [];
  public map: any;
  public gmaps: any;
  private el: any;
  private counter = 0;
  private markers: any = {};
  private polylines: any = {};
  private updateViewport: any;

  constructor(private elRef: ElementRef, private ngZone: NgZone) {
    this.el = elRef.nativeElement;
    this.updateViewport = _.debounce(this._updateViewport, 200);
  }

  public ngOnInit() {
    this.createMapPromise = gmapsLoadPromise
      .then(gmaps => {
        this.gmaps = gmaps;
        return createMap(this.el, {
          center: { lat: 39.50, lng: -98.35 },
          zoom: 4,
          minZoom: 2,
          disableDefaultUI: true,
        });
      })
      .then(map => {
        this.ngZone.runOutsideAngular(() => this.gmaps.event.addListener(map, 'click', () => this.onClick.emit()));
        this.map = map;
        return map;
      })
    ;
  }

  public fitMapToBounds() {
    return Promise.all(this.markerPromiseList)
      .then(() => {
        const bounds = new google.maps.LatLngBounds();
        (Object as any).values(this.markers).forEach(m => {
          if (m.visible) bounds.extend(m.getPosition());
        });
        if (!bounds.isEmpty()) {
          this.map.setCenter(bounds.getCenter());
          this.map.fitBounds(bounds);
          this.map.setZoom(this.map.getZoom() - 1);
          if (this.map.getZoom() > 15) {
            this.map.setZoom(15);
          }
        }
      });
  }

  public resize() {
    this.ngZone.runOutsideAngular(() => this.gmaps.event.trigger(this.map, 'resize'));
  }

  public panTo(coords) {
    this.map.panTo(new this.gmaps.LatLng(coords.lat, coords.lng));
  }

  public panIn(coords, zoomLevel = 12) {
    let zoom = this.map.getZoom();
    const zoomMap = () => {
      this.map.setCenter(new this.gmaps.LatLng(coords.lat, coords.lng));
      if (zoom < zoomLevel) {
        zoom += 1;
        this.map.setZoom(zoom);
        setTimeout(zoomMap, 100);
      }
    };
    zoomMap();
  }

  public addMarker(marker, options: any = {}) {
    const id = this.createId('marker');
    this.markers[id] = marker;
    marker.setMap(this.map);
    if (options.autoZoom) this.updateViewport();
    return id;
  }

  public removeMarker(id) {
    this.markers[id].setMap(null);
    delete this.markers[id];
  }

  public addPolyline(polyline, options) {
    const id = this.createId('polyline');
    this.polylines[id] = polyline;
    polyline.setMap(this.map);
    if (options.autoZoom) this.updateViewport();
    return id;
  }

  public removePolyline(id) {
    this.polylines[id].setMap(null);
    delete this.polylines[id];
  }

  public addControl(control) {
    this.map.controls[this.gmaps.ControlPosition[control.position]].push(control.element);
  }

  private createId(type) {
    return `${type}-${this.counter++}`;
  }

  private getZoomByBounds(bounds: any) {
    const map = this.map;
    const MAX_ZOOM = map.mapTypes.get(map.getMapTypeId()).maxZoom || 21;
    const MIN_ZOOM = map.mapTypes.get(map.getMapTypeId()).minZoom || 0;

    const ne = map.getProjection().fromLatLngToPoint(bounds.getNorthEast());
    const sw = map.getProjection().fromLatLngToPoint(bounds.getSouthWest());

    const worldCoordWidth = Math.abs(ne.x - sw.x);
    const worldCoordHeight = Math.abs(ne.y - sw.y);

    // Fit padding in pixels
    const FIT_PAD = 40;

    for (let zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom) {
      if (worldCoordWidth * (1 << zoom) + 2 * FIT_PAD < map.getDiv() ? $(map.getDiv()).width() : 0 &&
      worldCoordHeight * (1 << zoom) + 2 * FIT_PAD < map.getDiv() ? $(map.getDiv()).height() : 0 ) {
        return zoom;
      }
    }

    return 0;
  }

  private _updateViewport() {
    let coordsCount = 0;
    const bounds = new this.gmaps.LatLngBounds();
    const markers = this.markers;
    const polylines = this.polylines;

    this.resize();

    _.forIn(markers, (val: any, key: any) => {
      bounds.extend(markers[key].getPosition());
      coordsCount++;
    });

    _.forIn(polylines, (val: any, key: any) => {
      const polyline = polylines[key];
      polyline.getPath().getArray().forEach((latLng: any) => bounds.extend(latLng));
      coordsCount += polyline.getPath().getLength();
    });

    if (coordsCount > 1) {
      _.forIn(markers, (m: any) => bounds.extend(m.getPosition()));
      this.map.fitBounds(bounds);
      this.gmaps.event.addListenerOnce(this.map, 'bounds_changed', () => {
        this.map.setZoom(this.getZoomByBounds(bounds));
      });
    } else if (coordsCount === 1) {
      this.map.setCenter(bounds.getCenter());
      this.map.setZoom(10);
    }
  }
}
