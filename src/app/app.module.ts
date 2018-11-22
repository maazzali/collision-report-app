import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartModule } from './misc/line-chart.module';
import { CollisionReportSliderModule } from './misc/collision-report-slider.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    CollisionReportSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
