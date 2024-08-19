import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';

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

  constructor(private homeService: HomeService){

    // console.log("Input  on right side pane : ", this.cityName)
  }
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
        // this.getWeatherForecast();
      }
    })
  }




}
