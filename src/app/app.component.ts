import { Component, OnInit } from '@angular/core';
import { AppService } from './core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  
  title = 'weather-app';
  constructor(private appService: AppService){}
  ngOnInit(): void {
    this.appService.getLocationAccess();
  }
}
