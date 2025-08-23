import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailSkeletonComponent } from './post-detail-skeleton.component';

describe('PostDetailSkeletonComponent', () => {
  let component: PostDetailSkeletonComponent;
  let fixture: ComponentFixture<PostDetailSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
