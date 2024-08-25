import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { HomeService, ICitySearchData } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  unSub:Subject<void> = new Subject<void>();

  page:number = 1;
  @ViewChild('searchElement') searchInput : ElementRef;

  regex = /^[a-zA-Z\s]*$/;

  constructor(
    public homeService: HomeService,
    public appService:AppService
  ){}
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }

  ngOnInit(): void {

    // Change page according to number
    this.homeService.currentPage.pipe(takeUntil(this.unSub)).subscribe((page) => {
      this.page = page;
      console.log('2. changed value of this.page: ', this.page);
    })

    // API CALL FOR FIRST TIME
    this.appService.locationAccessProvided.pipe(takeUntil(this.unSub)).subscribe((flag) => {
      if(flag){
        console.log(" Location permission is enabled ******************  ")
        this.getWeatherInfoLatLon();
        this.getWeatherForecast();
        this.appService.locationDataLoaded = true;
      } else {
        console.log(" Location permission is not enabled ------------------------- ")
        this.setRandomCityInfo();
        
        this.appService.dataLoaded = false;
        const weatherInfo = this.getWeatherInfo(this.homeService.currentCity);
        const todaysWeatherCondition = this.getWeatherForecast();

        Promise.all([weatherInfo, todaysWeatherCondition]).then(() => {
          // console.log("2. Weather Info Loaded Successfully");
        }).catch((err) => {
          // console.log("3. Error while getting weather information");
        })
      }

      this.appService.dataLoaded = true;
    })
    
  }

  @HostListener('window:focusin',['$event'])
  openCitySearchPage(event){
    this.homeService.currentPage.next(2);
  }


  setRandomCityInfo(){
    this.homeService.currentCity = this.homeService.getRandomCity();
    this.homeService.cityName.next(this.homeService.currentCity);
    console.log('2. Random CurrentCity is set : ', this.homeService.currentCity);
  }

  // API CALL TO GET THE WEATHER FOR THE CITY
  getWeatherInfo(city: string){
    this.homeService.getWeatherInfo(city).pipe(takeUntil(this.unSub)).subscribe((data: any)=> {
      // console.log('Data for current city : ', data);
      if(data){
        const airCondition = {
          temperature : data.current.temp_c,
          windSpeed: data.current.wind_kph,
          chanceOfRain: data.current.cloud,
          uvIndex: data.current.uv
        }

        if(this.homeService.currentPage.value == 1){
          this.homeService.celsiusValue = data.current.temp_c
          this.homeService.chanceOfRain = data.current.cloud;
          this.homeService.widgetIcon = data.current.condition.icon
          this.homeService.weatherCondition = data.current.condition.text;
          this.homeService.canViewImage = true;
  
  
          this.homeService.airConditionInfo = airCondition;
          console.log('1. API CALL TO WEATHER INFO : ', data );
        }

        this.homeService.dataIsLoaded = true;

        if(this.homeService.currentPage.value == 2){
          const hours = new Date(data.location.localtime).getHours();
          const minutes = new Date(data.location.localtime).getMinutes()
          const cityWeatherInfo: ICitySearchData = {
            cityName : data.location.name,
            iconSrc: data.current.condition.icon,
            temperature: data.current.temp_c,
            time: this.converTimeFormat(hours,minutes), 
            chanceOfRain: data.current.cloud,
            airConditionInfo: airCondition,
          }

          this.homeService.pastCitySearchList.push(cityWeatherInfo);
          this.homeService.searchButtonClicked.next(data.location.name);
          this.homeService.currentCityWeatherInfo = cityWeatherInfo;
        }
      }
    }, (error) => {
      console.log('ERROR WHILE GETTING WEATHER INFO FOR CITY : ', this.homeService.currentCity);
    })
  }

  getWeatherInfoLatLon(){
    this.homeService.getWeatherInfoLatLon(this.appService.latitute, this.appService.longitude).pipe(takeUntil(this.unSub)).subscribe((data: any)=> {
      console.log('1. Response from API with users current location data  : ', data);
      if(data){
        this.homeService.celsiusValue = data.current.temp_c
        this.homeService.chanceOfRain = data.current.cloud;
        this.homeService.widgetIcon = data.current.condition.icon
        console.log('2. Widget Icon For current location : ', data.current.condition.icon);
        this.homeService.weatherCondition = data.current.condition.text;
        this.homeService.canViewImage = true;

        this.homeService.currentCity = data.location.name;
        this.homeService.cityName.next(this.homeService.currentCity);

        const airCondition = {
          temperature : data.current.temp_c,
          windSpeed: data.current.wind_kph,
          chanceOfRain: data.current.cloud,
          uvIndex: data.current.uv
        }

        this.homeService.airConditionInfo = airCondition;
        console.log('2. this.homeService.airConditionInfo: ', this.homeService.airConditionInfo);
        this.homeService.dataIsLoaded = true;

        this.getWeatherForecast();
      }
    }, (error) => {
      console.log('ERROR WHILE GETTING WEATHER INFO FOR CITY : ', this.homeService.currentCity);
    })
  }

  // Today's weather forecast
  getWeatherForecast(){
    if(this.homeService.currentCity){
      this.homeService.getWeatherForecast(this.homeService.currentCity).subscribe((response: any) => {
        // console.log(" 4. Today weather forecast : ", response);
        if(response){
          const responseData = response.forecast.forecastday[0];
          this.homeService.hourlyReport = responseData.hour;
          // console.log('5. hourlyReport: ', this.hourlyReport);
          this.extractHourlyReport()
          // console.log(" 6. Filtered Required hour condition : ", this.filterdHourlyReport)
        }
      },(error) => {
        console.log('ERROR WHILE GETTING TODAYS WEATHER CONDITION FOR : ', this.homeService.currentCity);
      })
    }
  }

  // EXTRACT TIME INTERVAL FROM HOURLY REPORT
  extractHourlyReport(){
    if(this.homeService.hourlyReport.length > 0){
      const hourInterval = [6, 9, 12, 15, 18, 21];
      this.homeService.filterdHourlyReport = this.homeService.hourlyReport.filter(hour =>
        hourInterval.includes(new Date(hour.time).getHours())
      )

      console.log("Filtered Hourly Report : ", this.homeService.filterdHourlyReport)
    }
  }

  @HostListener('document:keydown',['$event'])
  searchCityOnEnter(event: KeyboardEvent){
    if(event.key === 'Enter'){
      console.log("Enter key is pressed : ")
      event.preventDefault();
      event.stopPropagation();
      this.searchCity(event)
    }
  }


  // CITY SEARCH API 
  searchCity(event: UIEvent){
    event.preventDefault();
    event.stopPropagation();
    const textEl = this.searchInput.nativeElement as HTMLInputElement

    const inputValue: string = textEl.value
    let cityExists: boolean = false;
   
    if (inputValue.length > 0 && this.regex.test(inputValue)) {
      // check city name already exisits in the list 
      this.homeService.pastCitySearchList.forEach((city) => {
        if (city.cityName.toLowerCase() == inputValue.toLowerCase()) {
          console.error("City Already exisits!")
          cityExists = true;
          return ;
        } 
      })
      if(!cityExists){
        textEl.value = "";
        this.getWeatherInfo(inputValue);
      }
    }
  }

  converTimeFormat(hour: number, minute: number){
    // console.log(" Time : ", time)
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const FormattedHour = hour % 12 || 12;
    const formattedTime = `${FormattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return formattedTime+" "+amPm;
    // console.log("Formatted Time : ", this.formattedTime)
  }

  
}
