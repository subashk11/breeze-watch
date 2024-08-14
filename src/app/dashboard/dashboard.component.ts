import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // constructor to inject the dependency
  constructor(private router: Router){};

  openWeatherApp(event: MouseEvent){
    event.preventDefault();
    event.stopPropagation();

    this.router.navigate(['/home'])
  }
}
