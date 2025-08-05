import { TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';

describe('AdminPage', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [AdminPage] }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

