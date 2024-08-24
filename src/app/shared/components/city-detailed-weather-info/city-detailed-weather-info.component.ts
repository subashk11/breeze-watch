import { Component } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-city-detailed-weather-info',
  templateUrl: './city-detailed-weather-info.component.html',
  styleUrls: ['./city-detailed-weather-info.component.scss']
})
export class CityDetailedWeatherInfoComponent {

  constructor(public homeService: HomeService){}
}
