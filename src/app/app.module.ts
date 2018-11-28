import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartModule } from './common-components/line-chart/line-chart.module';
import { MainComponent } from './main/main.component';
import { MapModule } from './common-components/map/map.module';
import { CollisionReportSliderModule } from './common-components/collision-report-slider/collision-report-slider.module';
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
