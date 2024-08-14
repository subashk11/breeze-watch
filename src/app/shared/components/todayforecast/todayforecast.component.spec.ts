import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayforecastComponent } from './todayforecast.component';

describe('TodayforecastComponent', () => {
  let component: TodayforecastComponent;
  let fixture: ComponentFixture<TodayforecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayforecastComponent]
    });
    fixture = TestBed.createComponent(TodayforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
