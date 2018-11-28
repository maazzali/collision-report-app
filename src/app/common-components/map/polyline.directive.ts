import { Directive, Inject, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MapComponent } from './map.component';
import { gmapsLoadPromise } from '../../lib/google-maps';

@Directive({
  selector: 'map-polyline',
})
export class MapPolylineDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public coords: any;
  @Input() public autoZoom: any;
  @Input() public color = '#c7e0af';
  @Input() public zIndex = 0;
  @Input() public width = 0;
  private gmaps: any;
  private id: any;
  private polylineObj: any;

  constructor(@Inject(MapComponent) private map: MapComponent) {
    gmapsLoadPromise.then(gmaps => this.gmaps = gmaps);
  }

  public ngOnInit() {
    this.map.createMapPromise.then(() => {
      this.create();
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    const coords = changes.coords;
    if (this.id && !coords.firstChange && coords.currentValue.length !== changes.coords.previousValue.length) {
      this.polylineObj.setPath(this.coords.map((c: any) => new this.gmaps.LatLng(c.lat, c.lng)));
    }
  }

  public ngOnDestroy() {
    this.remove();
  }

  private remove() {
    if (this.id) {
      this.map.removePolyline(this.id);
    }
  }

  private getStyle() {
    return {
      strokeColor: this.color,
      strokeOpacity: 1.0,
      strokeWeight: this.width,
      zIndex: this.zIndex,
    };
  }

  private create() {
    const props: any = this.getStyle();
    props.path = this.coords.map((c: any) => new this.gmaps.LatLng(c.lat, c.lng));
    const options = {
      autoZoom: this.autoZoom === undefined ? true : this.autoZoom,
    };
    const polylineObj = this.polylineObj = new this.gmaps.Polyline(props);
    this.id = this.map.addPolyline(polylineObj, options);
  }
}
