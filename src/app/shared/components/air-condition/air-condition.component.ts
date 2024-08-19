import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-air-condition',
  templateUrl: './air-condition.component.html',
  styleUrls: ['./air-condition.component.scss']
})
export class AirConditionComponent implements OnInit{

  @Input("airCondition") aircondition ;

  ngOnInit(): void {
    console.log("Aircondition is passed from the input : ", this.aircondition)
  }

}
