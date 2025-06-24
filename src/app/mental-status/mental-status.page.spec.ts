import { TestBed } from '@angular/core/testing';
import { MentalStatusPage } from './mental-status.page';

describe('MentalStatusPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [MentalStatusPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MentalStatusPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
