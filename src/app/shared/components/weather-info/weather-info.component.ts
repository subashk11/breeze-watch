import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';
import { Constant } from '../../constants/Constant';
import { AppService } from 'src/app/core/services/app.service';

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

  constructor(
    private homeService: HomeService,
    private appService: AppService
  ){}
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }

  async ngOnInit(): Promise<void> {
    let weatherInfo
    let todaysWeatherCondition

    console.log("1. Home Component flag value : ")
    this.appService.locationAccessProvided.pipe(takeUntil(this.unSub)).subscribe((flag) => {
      if(flag){
        console.log(" Location permission is enabled ******************  ")
        this.getWeatherInfoLatLon();
        this.getWeatherForecast();
      } else {
        console.log(" Location permission is not enabled ------------------------- ")
        this.setRandomCityInfo();
        weatherInfo = this.getWeatherInfo();
        todaysWeatherCondition = this.getWeatherForecast();

        Promise.all([weatherInfo, todaysWeatherCondition]).then(() => {
          // console.log("2. Weather Info Loaded Successfully");
        }).catch((err) => {
          // console.log("3. Error while getting weather information");
        })
      }
    })
  }

  setRandomCityInfo(){
    this.currentCity = this.homeService.getRandomCity();
    this.homeService.cityName.next(this.currentCity);
    console.log('2. Random CurrentCity is set : ', this.currentCity);
  }

  // API CALL TO GET THE WEATHER FOR THE CITY
  getWeatherInfo(){
    this.homeService.getWeatherInfo(this.currentCity).pipe(takeUntil(this.unSub)).subscribe((data: any)=> {
      // console.log('Data for current city : ', data);
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

  getWeatherInfoLatLon(){
    this.homeService.getWeatherInfoLatLon(this.appService.latitute, this.appService.longitude).pipe(takeUntil(this.unSub)).subscribe((data: any)=> {
      console.log('1. Response from API with users current location data  : ', data);
      if(data){
        this.celsiusValue = data.current.temp_c
        this.chanceOfRain = data.current.cloud;
        this.widgetIcon = data.current.condition.icon
        this.weatherCondition = data.current.condition.text;
        this.canViewImage = true;

        this.currentCity = data.location.name;
        this.homeService.cityName.next(this.currentCity);
        // console.log('2. Users CurrentCity: ', this.currentCity);

        const airCondition = {
          temperature : data.current.temp_c,
          windSpeed: data.current.wind_kph,
          chanceOfRain: data.current.cloud,
          uvIndex: data.current.uv
        }

        this.airConditionInfo = airCondition;
        this.dataIsLoaded = true;

        this.getWeatherForecast();
      }
    }, (error) => {
      console.log('ERROR WHILE GETTING WEATHER INFO FOR CITY : ', this.currentCity);
    })
  }

  // Today's weather forecast
  getWeatherForecast(){
    if(this.currentCity){
      this.homeService.getWeatherForecast(this.currentCity).subscribe((response: any) => {
        // console.log(" 4. Today weather forecast : ", response);
        if(response){
          const responseData = response.forecast.forecastday[0];
          this.hourlyReport = responseData.hour;
          // console.log('5. hourlyReport: ', this.hourlyReport);
          this.extractHourlyReport()
          // console.log(" 6. Filtered Required hour condition : ", this.filterdHourlyReport)
        }
      },(error) => {
        console.log('ERROR WHILE GETTING TODAYS WEATHER CONDITION FOR : ', this.currentCity);
      })
    }
  }

  // EXTRACT TIME INTERVAL FROM HOURLY REPORT
  extractHourlyReport(){
    if(this.hourlyReport.length > 0){
      const hourInterval = [6, 9, 12, 15, 18, 21];
      this.filterdHourlyReport = this.hourlyReport.filter(hour =>
        hourInterval.includes(new Date(hour.time).getHours())
      )

      console.log("Filtered Hourly Report : ", this.filterdHourlyReport)
    }
  }
}
