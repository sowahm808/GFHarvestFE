import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomePage } from './home.page';

describe('HomePage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
