import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      {
        path : '',
        component: WeatherInfoComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutesModule { }
