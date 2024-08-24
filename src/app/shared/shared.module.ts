import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { TodayforecastComponent } from './components/todayforecast/todayforecast.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { AirConditionComponent } from './components/air-condition/air-condition.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { RouterModule } from '@angular/router';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { CityDetailedWeatherInfoComponent } from './components/city-detailed-weather-info/city-detailed-weather-info.component';



@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    TodayforecastComponent,
    RightPanelComponent,
    AirConditionComponent,
    WeatherInfoComponent,
    CitySearchComponent,
    CityDetailedWeatherInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  bootstrap:[HomeComponent]
})
export class SharedModule { }
