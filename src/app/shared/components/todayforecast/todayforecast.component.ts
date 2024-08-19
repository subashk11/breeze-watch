import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-todayforecast',
  templateUrl: './todayforecast.component.html',
  styleUrls: ['./todayforecast.component.scss']
})
export class TodayforecastComponent implements OnInit, OnDestroy {
  // Find todays forecast
  cityName: string = '';
  @Input("hourInfo") hourWeatherInfo;
  time: number = 0;
  widgetIcon: string = "";
  temperature: string = "";
  formattedTime: string = ''

  constructor(private homeService: HomeService){

  }
  ngOnDestroy(): void {
    // Closing the unsub subject to stop listening

  }

  ngOnInit(): void {
    // console.log("Input from weather info page : ", this.hourWeatherInfo)
    this.temperature = this.hourWeatherInfo.temp_c;
    this.widgetIcon = this.hourWeatherInfo.condition.icon;
    this.time = new Date(this.hourWeatherInfo.time).getHours();
    this.converTimeFormat(this.time);
  }

  converTimeFormat(time: number){
    // console.log(" Time : ", time)
    const amPm = time >= 12 ? 'PM' : 'AM';
    const hour = time % 12 || 12;
    this.formattedTime = hour+":00 "+amPm;
    // console.log("Formatted Time : ", this.formattedTime)
  }


}
