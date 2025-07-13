import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimerCardComponent } from './disclaimer-card.component';

describe('DisclaimerCardComponent', () => {
  let component: DisclaimerCardComponent;
  let fixture: ComponentFixture<DisclaimerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisclaimerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisclaimerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
