import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDetailedWeatherInfoComponent } from './city-detailed-weather-info.component';

describe('CityDetailedWeatherInfoComponent', () => {
  let component: CityDetailedWeatherInfoComponent;
  let fixture: ComponentFixture<CityDetailedWeatherInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityDetailedWeatherInfoComponent]
    });
    fixture = TestBed.createComponent(CityDetailedWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
