import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
    console.log(" App Service is triggered ***************************************** ")
   }

  latitute: number ;
  longitude: number;
  locationAccessProvided: Subject<boolean> = new Subject<boolean>();

  getLocationAccess(){
    if(navigator.geolocation){

      // GET NAVIGATION 
     navigator.geolocation.getCurrentPosition(
        (position: any) => {
          console.log("1. Position Info found : ", position);
          if(position){
            this.latitute = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.locationAccessProvided.next(true);
            console.log("2. Coordinates info : ", this.latitute, " Longitute : ", this.longitude)
          }
        },
        (error) => {
          // Error callback
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            default:
              console.error("An unknown error occurred.");
              break; 
          }

          this.locationAccessProvided.next(false);
        }
      )
    } else {
      this.locationAccessProvided.next(false);
      console.log("Failed to get location access ! ")
    }
  }
  
}
