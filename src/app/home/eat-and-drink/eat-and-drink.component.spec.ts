import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EatAndDrinkComponent } from './eat-and-drink.component';

describe('EatAndDrinkComponent', () => {
  let component: EatAndDrinkComponent;
  let fixture: ComponentFixture<EatAndDrinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EatAndDrinkComponent]
    });
    fixture = TestBed.createComponent(EatAndDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
