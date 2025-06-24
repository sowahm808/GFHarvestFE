import { TestBed } from '@angular/core/testing';
import { AcademicProgressPage } from './academic-progress.page';

describe('AcademicProgressPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AcademicProgressPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AcademicProgressPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
