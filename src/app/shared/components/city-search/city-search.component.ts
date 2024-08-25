import { Component } from '@angular/core';
import { HomeService, ICitySearchData } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {

  constructor(public homeService:HomeService){}

  showCityWeatherDetails(cityDetails: ICitySearchData, index: number){
    console.log("2. City is clicked **************** ", cityDetails);
    this.homeService.currentCityWeatherInfo = cityDetails;
    this.homeService.searchButtonClicked.next(cityDetails.cityName)
  }
}
