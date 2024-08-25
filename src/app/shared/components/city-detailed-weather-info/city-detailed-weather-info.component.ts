import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService, ICitySearchData } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-city-detailed-weather-info',
  templateUrl: './city-detailed-weather-info.component.html',
  styleUrls: ['./city-detailed-weather-info.component.scss']
})
export class CityDetailedWeatherInfoComponent implements OnInit{


  cityWeatherInfo: ICitySearchData;
  unSub:Subject<void> = new Subject<void>();
  filterdHourlyReport: any[] = []

  constructor(public homeService: HomeService){}
  ngOnInit(): void {
    this.homeService.searchButtonClicked.pipe(takeUntil(this.unSub)).subscribe( (value) => {
      if(value){
        console.log(" 1. Button is clicked ************************ ", value);
        this.getCityForecast(value);
      }
    })
  }


  // Get city forecast for today
  getCityForecast(cityName:string){
    if(cityName){
      this.homeService.getWeatherForecast(cityName).subscribe((response: any) => {
        // console.log(" 4. Today weather forecast : ", response);
        if(response){
          const responseData = response.forecast.forecastday[0];
          this.homeService.hourlyReport = responseData.hour;
          // console.log('5. hourlyReport: ', this.hourlyReport);
          this.extractHourlyReport()
          // console.log(" 6. Filtered Required hour condition : ", this.filterdHourlyReport)
        }
      },(error) => {
        console.log('ERROR WHILE GETTING TODAYS WEATHER CONDITION FOR : ', cityName);
      })
    }
  }

  
  extractHourlyReport(){
    if(this.homeService.hourlyReport.length > 0){
      const hourInterval = [6, 9, 12];
      this.filterdHourlyReport = this.homeService.hourlyReport.filter(hour =>
        hourInterval.includes(new Date(hour.time).getHours())
      )

      console.log("1. City weather forcast for today : ", this.filterdHourlyReport)
    }
  }
}
