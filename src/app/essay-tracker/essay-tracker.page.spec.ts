import { TestBed } from '@angular/core/testing';
import { EssayTrackerPage } from './essay-tracker.page';

describe('EssayTrackerPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [EssayTrackerPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(EssayTrackerPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
