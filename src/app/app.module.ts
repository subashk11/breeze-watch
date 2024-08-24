import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './shared/components/home/home.component';
import { LeftPanelComponent } from './shared/components/left-panel/left-panel.component';
import { WeatherInfoComponent } from './shared/components/weather-info/weather-info.component';
import { RightPanelComponent } from './shared/components/right-panel/right-panel.component';
import { AirConditionComponent } from './shared/components/air-condition/air-condition.component';
import { TodayforecastComponent } from './shared/components/todayforecast/todayforecast.component';
import { CitySearchComponent } from './shared/components/city-search/city-search.component';
import { CityDetailedWeatherInfoComponent } from './shared/components/city-detailed-weather-info/city-detailed-weather-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftPanelComponent,
    WeatherInfoComponent,
    RightPanelComponent,
    AirConditionComponent,
    TodayforecastComponent,
    CitySearchComponent,
    CityDetailedWeatherInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
