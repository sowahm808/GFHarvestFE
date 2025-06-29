import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BibleQuizPage } from './bible-quiz.page';
import { BibleQuizApiService } from '../services/bible-quiz-api.service';

describe('BibleQuizPage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [BibleQuizPage],
      providers: [
        {
          provide: BibleQuizApiService,
          useValue: {
            getTodayQuiz: () => of(null),
            submitQuiz: () => of(null),
          },
        },
      ],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(BibleQuizPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
