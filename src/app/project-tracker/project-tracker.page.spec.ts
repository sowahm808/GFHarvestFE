import { TestBed } from '@angular/core/testing';
import { ProjectTrackerPage } from './project-tracker.page';

describe('ProjectTrackerPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ProjectTrackerPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ProjectTrackerPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
