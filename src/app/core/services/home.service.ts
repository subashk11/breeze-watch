import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constant } from 'src/app/shared/constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  sampleCities: string[] = ['London', 'Chennai', 'Hyderabad', 'Tokyo', 'New York', 'Madrid']
  cityName: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) { }

  getLatitudeAndLongitude(city: string){
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${Constant.API_KEY}`)
  }

  getWeatherInfo(city: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Constant.API_KEY}`)
  }

  getWeatherForecast(lat: number, lon: number){
    return this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}4&appid=${Constant.API_KEY}`)
  }

  getRandomCity(): string{
    // Return a random city from the list of items
    const randomInt:number = Math.floor(Math.random()*5);
    this.cityName.next(this.sampleCities[randomInt]);
    return this.sampleCities[randomInt];
  }
}
