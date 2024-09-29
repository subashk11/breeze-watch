import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';


interface weatherForecastForAWeek {
  day : string,
  widgetIconSrc: string,
  condition: string,
  maxTemp: number,
  minTemp: number
}

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit, OnDestroy{

  // @Input('cityName') cityName;
  unSub: Subject<void> = new Subject<void>();
  cityName: string = '';
  lat: number = 0;
  lon: number = 0;

  weekForeCastList: weatherForecastForAWeek[] = [];

  week: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  constructor(public homeService: HomeService){}

  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }

  ngOnInit(): void {
    // Subsribe to city name
    this.homeService.cityName.pipe(takeUntil(this.unSub)).subscribe((city) => {
      if(city.length > 0){
        this.cityName = city;
        console.log("2. Right side panel : ", city)
        this.getWeeklyWeatherForecast();
      }
    })
  }

  getWeeklyWeatherForecast(){
    console.log("1. right Side panel api call to get week report for city : ", this.cityName)
    this.homeService.getWeekWeatherForecast(this.cityName).subscribe((response: any) => {
      if(response){
        const foreCastForWeek: any[] = response.forecast.forecastday;
        console.log('response.forecast: ', response.forecast);

        console.log('2. right side panel response for weekly forecast : ', foreCastForWeek);
        foreCastForWeek.forEach( dayReport => {
          const dateEpoch = dayReport.date_epoch

          // 
          const dayInfo: weatherForecastForAWeek = {
            day: this.getDayFromEpoch(dateEpoch),
            widgetIconSrc: dayReport.day.condition.icon,
            condition: dayReport.day.condition.text,
            maxTemp: Math.floor(dayReport.day.maxtemp_c),
            minTemp: Math.floor(dayReport.day.mintemp_c)
          }

          // Add tp forecast list
          this.weekForeCastList.push(dayInfo)
        })
      }
      console.log('3. Right Side panel this.weekForeCastList: ', this.weekForeCastList);
    })
  }
  

    getDayFromEpoch(epochDate: number): string{
      const DateToMilliSec = new Date(epochDate * 1000);
      const dayOfWeek: number = DateToMilliSec.getDay();
      return this.week[dayOfWeek]
    }



}
