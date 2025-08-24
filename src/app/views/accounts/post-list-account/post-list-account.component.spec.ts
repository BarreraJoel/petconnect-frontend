import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListAccountComponent } from './post-list-account.component';

describe('PostListAccountComponent', () => {
  let component: PostListAccountComponent;
  let fixture: ComponentFixture<PostListAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
