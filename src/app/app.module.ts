import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartModule } from './slider-chart/line-chart.module';
import { MainComponent } from './main/main.component';
import { MapModule } from './map/map.module';
import { CollisionReportSliderModule } from './slider-chart/collision-report-slider.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    MapModule,
    CollisionReportSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
