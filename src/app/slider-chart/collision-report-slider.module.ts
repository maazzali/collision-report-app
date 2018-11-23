import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollisionReportSlideComponent } from './collision-report-slider.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CollisionReportSlideComponent
  ],
  exports: [
    CollisionReportSlideComponent
  ]
})
export class CollisionReportSliderModule {}
