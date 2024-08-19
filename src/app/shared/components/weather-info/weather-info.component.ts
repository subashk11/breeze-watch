import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';
import { Constant } from '../../constants/Constant';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})
export class WeatherInfoComponent implements OnInit, OnDestroy{

  currentCity:string = '';
  lat:string = '';
  lon:string = '';
  unSub:Subject<void> = new Subject<void>();
  farenheitValue: number = 0;
  celsiusValue: number = 0;
  chanceOfRain: number = 0;
  widgetIcon: string = '';
  weatherCondition: string = ''
  hourlyReport: any[] = null;
  filterdHourlyReport: any[] = null;
  airConditionInfo: any;

  canViewImage: boolean = false;
  dataIsLoaded: boolean = false;

  constructor(private homeService: HomeService){}
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }

  async ngOnInit(): Promise<void> {
    await this.setRandomCityInfo();
    const weatherInfo = this.getWeatherInfo();
    const todaysWeatherCondition = this.getWeatherForecast();

    Promise.all([weatherInfo, todaysWeatherCondition]).then(() => {
      console.log("2. Weather Info Loaded Successfully");
    }).catch((err) => {
      console.log("3. Error while getting weather information");
    })
  }

  setRandomCityInfo(){
    this.currentCity = this.homeService.getRandomCity();
    this.homeService.cityName.next(this.currentCity);
    console.log('1. CurrentCity: ', this.currentCity);
  }

  // API CALL TO GET THE WEATHER FOR THE CITY
  getWeatherInfo(){
    this.homeService.getWeatherInfo(this.currentCity  ).pipe(takeUntil(this.unSub)).subscribe((data: any)=> {
      console.log('Data for current city : ', data);
      if(data){
        this.celsiusValue = data.current.temp_c
        this.chanceOfRain = data.current.cloud;
        this.widgetIcon = data.current.condition.icon
        this.weatherCondition = data.current.condition.text;
        this.canViewImage = true;

        const airCondition = {
          temperature : data.current.temp_c,
          windSpeed: data.current.wind_kph,
          chanceOfRain: data.current.cloud,
          uvIndex: data.current.uv
        }

        this.airConditionInfo = airCondition;
        this.dataIsLoaded = true;
      }
    }, (error) => {
      console.log('ERROR WHILE GETTING WEATHER INFO FOR CITY : ', this.currentCity);
    })
  }

  // Today's weather forecast
  getWeatherForecast(){
    this.homeService.getWeatherForecast(this.currentCity).subscribe((response: any) => {
      console.log(" 4. Today weather forecast : ", response);
      if(response){
        const responseData = response.forecast.forecastday[0];
        this.hourlyReport = responseData.hour;
        console.log('5. hourlyReport: ', this.hourlyReport);
        this.extractHourlyReport()
        console.log(" 6. Filtered Required hour condition : ", this.filterdHourlyReport)
      }
    },(error) => {
      console.log('ERROR WHILE GETTING TODAYS WEATHER CONDITION FOR : ', this.currentCity);
    })
  }

  // EXTRACT TIME INTERVAL FROM HOURLY REPORT
  extractHourlyReport(){
    if(this.hourlyReport.length > 0){
      const hourInterval = [6, 9, 12, 15, 18, 21];
      this.filterdHourlyReport = this.hourlyReport.filter(hour =>
        hourInterval.includes(new Date(hour.time).getHours())
      )
    }
  }
}
