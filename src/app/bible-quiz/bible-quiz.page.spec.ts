import { TestBed } from '@angular/core/testing';
import { BibleQuizPage } from './bible-quiz.page';

describe('BibleQuizPage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [BibleQuizPage],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(BibleQuizPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
