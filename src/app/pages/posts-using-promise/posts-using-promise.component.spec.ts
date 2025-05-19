import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsUsingPromiseComponent } from './posts-using-promise.component';

describe('PostsUsingPromiseComponent', () => {
  let component: PostsUsingPromiseComponent;
  let fixture: ComponentFixture<PostsUsingPromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsUsingPromiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsUsingPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
