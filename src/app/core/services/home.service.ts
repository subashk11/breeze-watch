import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Constant } from 'src/app/shared/constants/Constant';


export interface ICitySearchData {
  cityName : string,
  iconSrc: string,
  temperature: number,
  time: string
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  sampleCities: string[] = ['London', 'Chennai', 'Hyderabad', 'Tokyo', 'New York', 'Madrid']
  cityName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentPage:BehaviorSubject<number> = new BehaviorSubject<number>(1);

  sampleCityData: ICitySearchData = {
    cityName : 'Chennai',
    iconSrc : '//cdn.weatherapi.com/weather/64x64/night/353.png',
    temperature : 24.5,
    time: "06:07"
  }

  pastCitySearchList: ICitySearchData[] = [this.sampleCityData]

  currentCity:string = '';
  lat:string = '';
  lon:string = '';
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

  constructor(private http: HttpClient) {

   }

  getLatitudeAndLongitude(city: string){
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${Constant.API_KEY}`)
  }

  getWeatherInfo(city: string){
    return this.http.get(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${Constant.API_KEY}`)
  }

  getWeatherInfoLatLon(lat:number, lon:number){
    return this.http.get(`https://api.weatherapi.com/v1/current.json?q=${lat},${lon}&key=${Constant.API_KEY}`)
  }

  getWeatherForecast(city: string){
    return this.http.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=${Constant.API_KEY}`)
  }
  
  getWeekWeatherForecast(city: string){
    return this.http.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${Constant.API_KEY}`)
  }

  getRandomCity(): string{
    // Return a random city from the list of items
    const randomInt:number = Math.floor(Math.random()*5);
    return this.sampleCities[randomInt];
  }
}
