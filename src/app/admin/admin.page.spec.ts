import { TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';
import { of } from 'rxjs';
import { MentorApiService } from '../services/mentor-api.service';
import { ToastController } from '@ionic/angular';

describe('AdminPage', () => {
  const mentorApiStub = {
    getMentors: () => of([]),
    getChildProfiles: () => of([]),
    createMentor: () => of({}),
    assignMentor: () => of({}),
  };
  const toastCtrlStub = {
    create: () => Promise.resolve({ present: () => Promise.resolve() }),
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AdminPage],
      providers: [
        { provide: MentorApiService, useValue: mentorApiStub },
        { provide: ToastController, useValue: toastCtrlStub },
      ],
    })
  );

  it('should create', () => {
    const fixture = TestBed.createComponent(AdminPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

