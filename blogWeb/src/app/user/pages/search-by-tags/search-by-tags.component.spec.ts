import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTagsComponent } from './search-by-tags.component';

describe('SearchByTagsComponent', () => {
  let component: SearchByTagsComponent;
  let fixture: ComponentFixture<SearchByTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
