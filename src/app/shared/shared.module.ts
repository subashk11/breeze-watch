import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { TodayforecastComponent } from './components/todayforecast/todayforecast.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { AirConditionComponent } from './components/air-condition/air-condition.component';



@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    TodayforecastComponent,
    RightPanelComponent,
    AirConditionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
