import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialLoaderComponent } from './partial-loader.component';

describe('PartialLoaderComponent', () => {
  let component: PartialLoaderComponent;
  let fixture: ComponentFixture<PartialLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
