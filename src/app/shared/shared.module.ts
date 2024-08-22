import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { TodayforecastComponent } from './components/todayforecast/todayforecast.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { AirConditionComponent } from './components/air-condition/air-condition.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    TodayforecastComponent,
    RightPanelComponent,
    AirConditionComponent,
    WeatherInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  bootstrap:[HomeComponent]
})
export class SharedModule { }
