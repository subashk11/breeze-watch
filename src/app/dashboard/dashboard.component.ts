import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../core/services/app.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  unSub:Subject<void> = new Subject<void>();

  // constructor to inject the dependency
  constructor(private router: Router, private appService: AppService){}
  
  
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  };

  
  openWeatherApp(event: MouseEvent){
    event.preventDefault();
    event.stopPropagation();

    this.appService.getLocationAccess(); 
    this.router.navigate(['/home']);
  }

}
