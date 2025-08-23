import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountSkeletonComponent } from './user-account-skeleton.component';

describe('UserAccountSkeletonComponent', () => {
  let component: UserAccountSkeletonComponent;
  let fixture: ComponentFixture<UserAccountSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
