import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAndFunComponent } from './party-and-fun.component';

describe('PartyAndFunComponent', () => {
  let component: PartyAndFunComponent;
  let fixture: ComponentFixture<PartyAndFunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyAndFunComponent]
    });
    fixture = TestBed.createComponent(PartyAndFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
