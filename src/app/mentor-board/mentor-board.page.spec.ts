import { TestBed } from '@angular/core/testing';
import { MentorBoardPage } from './mentor-board.page';

describe('MentorBoardPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [MentorBoardPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MentorBoardPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
