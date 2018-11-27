import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartModule } from './slider-chart/line-chart.module';
import { MainComponent } from './main/main.component';
import { MapModule } from './map/map.module';
import { CollisionReportSliderModule } from './slider-chart/collision-report-slider.module';
import { MainService } from './main/main.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LineChartModule,
    MapModule,
    CollisionReportSliderModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
