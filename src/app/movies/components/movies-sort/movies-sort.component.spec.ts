import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSortComponent } from './movies-sort.component';

describe('MoviesSortComponent', () => {
  let component: MoviesSortComponent;
  let fixture: ComponentFixture<MoviesSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
