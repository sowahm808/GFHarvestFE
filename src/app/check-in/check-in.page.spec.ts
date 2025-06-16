import { TestBed } from '@angular/core/testing';
import { CheckInPage } from './check-in.page';

describe('CheckInPage', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [CheckInPage]
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CheckInPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
