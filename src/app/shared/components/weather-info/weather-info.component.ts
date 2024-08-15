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

  @ViewChild('spanWidget') spanWidget: ElementRef ;
  canViewImage: boolean = false;

  constructor(private homeService: HomeService){}
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }

  ngOnInit(): void {
    this.setRandomCityInfo();
    this.getWeatherInfo();
  }

  setRandomCityInfo(){
    this.currentCity = this.homeService.getRandomCity();
    console.log('currentCity: ', this.currentCity);
  }

  // API CALL TO GET THE WEATHER FOR THE CITY
  getWeatherInfo(){
    this.homeService.getWeatherInfo(this.currentCity  ).pipe(takeUntil(this.unSub)).subscribe((data: any)=> {
      console.log('Data for current city : ', data);
      if(data){
        this.convertToCelsius(data.main.temp);
        this.chanceOfRain = data.clouds.all;
        this.widgetIcon = Constant.WeatherIcons[data.weather[0].main.toLowerCase()];
        this.canViewImage = true;
        console.log('icon : ', this.widgetIcon)
        // console.log('span : ', this.spanWidget.nativeElement)
      }
    }, (error) => {
      console.log('ERROR WHILE GETTING WEATHER INFO FOR CITY : ', this.currentCity);
    })
  }

  // Covert farenhiet to cesius
  convertToCelsius(kelvinScaleValue: number){
    this.celsiusValue = Math.floor(kelvinScaleValue - 273.15);
    this.farenheitValue = Math.floor((this.celsiusValue * 9/5) + 32);
  }
}
