import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyPostsComponent } from './view-my-posts.component';

describe('ViewMyPostsComponent', () => {
  let component: ViewMyPostsComponent;
  let fixture: ComponentFixture<ViewMyPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
