import { Directive, EventEmitter, Input, Output, OnInit, OnDestroy, NgZone, Inject } from '@angular/core';
import { MapComponent } from './map.component';
import { gmapsLoadPromise } from '../lib/google-maps';

const ICONS = {
  collision : {
    url: require('../../assets/images/event-collision.png'),
    scaledSize: {width: 24, height: 24},
    anchor: {x: 12, y: 12},
  },
};

@Directive({
  selector: 'map-marker'
})
export class MapMarkerDirective implements OnInit, OnDestroy {
  @Input() public lat: number;
  @Input() public lng: number;
  @Input() public title: string;
  @Input() public type: string;
  @Input() public zIndex: number;
  @Input() public visible: boolean;
  @Input() public autoZoom: boolean;
  @Input() public bearing: number;
  @Output() public onClick = new EventEmitter();
  @Output() public onDblClick = new EventEmitter();
  private gmaps: any;
  private id: any;
  private markerObj: google.maps.Marker;
  private createMarkerPromise = new Promise((resolve, reject) => reject());

  constructor(@Inject(MapComponent) private map: MapComponent, private ngZone: NgZone) {
    gmapsLoadPromise
      .then(gmaps => {
        this.gmaps = gmaps;
      })
    ;
  }

  public ngOnInit() {
    this.createMarkerPromise = this.map.createMapPromise
      .then(() => {
        return this.create();
      });
    this.map.markerPromiseList.push(this.createMarkerPromise);
  }

  public ngOnDestroy() {
    this.remove();
  }

  private getIcon(type: string = this.type) { return ICONS[type]; }

  private getPosition() {
    return new google.maps.LatLng(this.lat, this.lng);
  }

  private create() {
    const config: google.maps.MarkerOptions = {
      position: this.getPosition(),
      title: this.title,
      zIndex: this.zIndex || undefined,
      visible: this.visible === undefined ? true : this.visible,
    };

    this.markerObj = new google.maps.Marker(config);
    const promise: Promise<any> = this.setMarkerIcon('collision');
    return promise.then(() => {
      this.ngZone.runOutsideAngular(() => this.attachEvents());
      const options = {
        autoZoom: typeof this.autoZoom === 'boolean' ? this.autoZoom : true,
      };
      this.id = this.map.addMarker(this.markerObj, options);
    });
  }

  private remove() {
    if (!this.id) {
      return;
    }
    this.gmaps.event.clearInstanceListeners(this.markerObj);
    this.map.removeMarker(this.id);
  }

  private setMarkerIcon(type: string, opacity = 1) {
    return new Promise(resolve => {
      const icon = this.getIcon(type);
      this.markerObj.setIcon(icon);
      this.markerObj.setOpacity(opacity);
      resolve();
    });
  }

  private attachEvents() {
    const markerObj = this.markerObj;
    this.gmaps.event.addListener(markerObj, 'click', () => this.onClick.emit());
    this.gmaps.event.addListener(markerObj, 'dblclick', () => this.onDblClick.emit());
  }
}
