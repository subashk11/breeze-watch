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
    public homeService: HomeService,
    private appService: AppService
  ){}
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }

  async ngOnInit(): Promise<void> {
    console.log("1. Weather Component is Loaded ")
  }
}
