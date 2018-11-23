import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { MapMarkerDirective } from './marker.directive';
import { MapPolylineDirective } from './polyline.directive';

const COMPONENTS = [
  MapComponent,
  MapMarkerDirective,
  MapPolylineDirective,
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class MapModule {}
