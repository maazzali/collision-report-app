import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartModule } from './misc/line-chart.module';
import { MainComponent } from './main/main.component';
import { MapModule } from './map/module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    MapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
