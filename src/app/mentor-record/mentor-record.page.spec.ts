import { TestBed } from '@angular/core/testing';
import { MentorRecordPage } from './mentor-record.page';

describe('MentorRecordPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [MentorRecordPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MentorRecordPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
