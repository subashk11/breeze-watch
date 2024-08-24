import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {

  currentPage:number = 0;

  // 0 -> home , 1 -> city search , 2 -> settings

  constructor(private router: Router, private homeService: HomeService){}

  navigateToHome(){
    this.homeService.currentPage.next(1);
  }
  navigateToCitySearch(){
    this.homeService.currentPage.next(2);
  }
}
