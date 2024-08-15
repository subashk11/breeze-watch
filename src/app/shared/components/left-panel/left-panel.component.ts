import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {

  currentPage:number = 0;

  // 0 -> home , 1 -> city search , 2 -> settings

  constructor(private router: Router){}

  navigateToHome(){
    // route to home page
    console.log("navigation to dashboard")
    this.router.navigate(['home']);
  }
}
