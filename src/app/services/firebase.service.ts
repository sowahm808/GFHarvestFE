import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  query,
  orderBy,
  where,
  limit,
  deleteDoc,
} from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { DailyCheckin } from '../models/daily-checkin';
import { MentalStatus } from '../models/mental-status';
import { BibleQuizResult, BibleQuestion } from '../models/bible-quiz';
import { EssayEntry } from '../models/essay-entry';
import { AcademicProgressEntry } from '../models/academic-progress';
import { ProjectEntry } from '../models/project-entry';
import { LeaderboardEntry, UserStats } from '../models/user-stats';
import { ParentChildLink } from '../models/parent-child-link';
import { MentorChildLink } from '../models/mentor-child-link';
import { MentorRecord } from '../models/mentor-record';
import { AppNotification } from '../models/notification';
import { MentorProfile } from '../models/mentor-profile';
import { ChildProfile } from '../models/child-profile';
import { RoleRequest } from '../models/role-request';
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  auth: Auth = getAuth(this.app);
  db = getFirestore(this.app);

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Sign in or register using Google authentication.
   */
  loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  /**
   * Create a role request to be approved by an admin.
   */
  requestRole(uid: string, role: string, email: string) {
    return addDoc(collection(this.db, 'roleRequests'), {
      uid,
      role,
      email,
    });
  }

  async getRoleRequests(): Promise<RoleRequest[]> {
    const snap = await getDocs(collection(this.db, 'roleRequests'));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as RoleRequest) }));
  }

  async deleteRoleRequest(id: string) {
    await deleteDoc(doc(this.db, 'roleRequests', id));
  }

  async createChildAccount(
    email: string,
    password: string,
    parentId: string,
    name: string,
    age: number
  ) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await addDoc(collection(this.db, 'parentChildLinks'), {
      parentId,
      childId: cred.user.uid,
    });
    await setDoc(doc(this.db, 'childProfiles', cred.user.uid), { name, age });
    return cred;
  }

  async getParentIdForChild(childId: string): Promise<string | null> {
    const q = query(
      collection(this.db, 'parentChildLinks'),
      where('childId', '==', childId),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) {
      return null;
    }
    return (snap.docs[0].data() as ParentChildLink).parentId || null;
  }

  async saveDailyCheckin(data: DailyCheckin) {
    const docRef = await addDoc(collection(this.db, 'dailyCheckins'), data);
    if (data.childId) {
      await this.updateStreak(data.childId);
    }
    return docRef;
  }

  async saveMentalStatus(data: MentalStatus) {
    const docRef = await addDoc(collection(this.db, 'mentalStatus'), data);
    if (data.childId) {
      const parentId = await this.getParentIdForChild(data.childId);
      if (parentId && (data.bullied || data.notifyParent)) {
        await this.sendNotification(
          parentId,
          'Your child reported a concern in mental status form.'
        );
      }
    }
    return docRef;
  }

  async saveBibleQuiz(data: BibleQuizResult) {
    const docRef = await addDoc(collection(this.db, 'bibleQuizzes'), data);
    if (data.childId && data.score) {
      await this.addPoints(data.childId, data.score);
    }
    return docRef;
  }

  saveEssay(data: EssayEntry) {
    return addDoc(collection(this.db, 'essays'), data);
  }

  saveAcademicProgress(data: AcademicProgressEntry) {
    return addDoc(collection(this.db, 'schoolWork'), data);
  }

  saveProject(data: ProjectEntry) {
    return addDoc(collection(this.db, 'projects'), data);
  }

  async getRandomBibleQuestion(): Promise<BibleQuestion | null> {
    const snap = await getDocs(collection(this.db, 'bibleQuestions'));
    const docs = snap.docs;
    if (docs.length === 0) {
      return null;
    }
    const random = Math.floor(Math.random() * docs.length);
    return {
      id: docs[random].id,
      ...(docs[random].data() as Omit<BibleQuestion, 'id'>),
    } as BibleQuestion;
  }

  async getRandomBibleQuestions(count: number): Promise<BibleQuestion[]> {
    const snap = await getDocs(collection(this.db, 'bibleQuestions'));
    const docs = snap.docs;
    if (docs.length === 0) {
      return [];
    }
    const shuffled = docs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((d) => ({
      id: d.id,
      ...(d.data() as Omit<BibleQuestion, 'id'>),
    })) as BibleQuestion[];
  }

  async getBibleQuizHistory(childId: string): Promise<BibleQuizResult[]> {
    const q = query(
      collection(this.db, 'bibleQuizzes'),
      where('childId', '==', childId),
      orderBy('date', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as BibleQuizResult);
  }

  gradeQuizAnswer(question: BibleQuestion, answer: string): number {
    if (!question.answer) {
      return 0;
    }
    return question.answer.trim().toLowerCase() === answer.trim().toLowerCase()
      ? 200
      : 0;
  }

  async sendNotification(parentId: string, message: string) {
    return addDoc(collection(this.db, 'notifications'), {
      parentId,
      message,
      date: new Date().toISOString(),
    });
  }

  async getNotifications(userId: string, limitCount = 10): Promise<AppNotification[]> {
    const parentQuery = query(
      collection(this.db, 'notifications'),
      where('parentId', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    );
    const childQuery = query(
      collection(this.db, 'notifications'),
      where('childId', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    );
    const [parentSnap, childSnap] = await Promise.all([
      getDocs(parentQuery),
      getDocs(childQuery),
    ]);
    const docs = [...parentSnap.docs, ...childSnap.docs];
    return docs
      .sort((a, b) =>
        (b.data()['date'] || '').localeCompare(a.data()['date'] || '')
      )
      .slice(0, limitCount)
      .map((d) => ({ id: d.id, ...(d.data() as Omit<AppNotification, 'id'>) }));
  }

  async addPoints(childId: string, points: number) {
    const ref = doc(this.db, 'userStats', childId);
    await setDoc(ref, { points: increment(points) }, { merge: true });
  }

  async getUserStats(childId: string): Promise<UserStats | null> {
    const ref = doc(this.db, 'userStats', childId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data() as Partial<UserStats>;
    return {
      streak: data.streak || 0,
      lastCheckInDate: data.lastCheckInDate || '',
      points: data.points || 0,
    };
  }

  async updateStreak(childId: string) {
    const ref = doc(this.db, 'userStats', childId);
    const snap = await getDoc(ref);
    const today = new Date().toISOString().split('T')[0];
    if (!snap.exists()) {
      await setDoc(ref, {
        streak: 1,
        lastCheckInDate: today,
        points: 10,
      });
      return;
    }
    const data = snap.data() as UserStats;
    let streak = 1;
    if (data.lastCheckInDate) {
      const last = new Date(data.lastCheckInDate);
      const diff =
        (new Date(today).getTime() - last.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak = (data.streak || 0) + 1;
      }
    }
    let points = (data.points || 0) + 10;
    if (streak % 7 === 0) {
      points += 50;
    }
    await setDoc(
      ref,
      { streak, lastCheckInDate: today, points },
      { merge: true }
    );
  }

  async getLeaderboard(limitCount = 10): Promise<LeaderboardEntry[]> {
    const q = query(
      collection(this.db, 'userStats'),
      orderBy('points', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => ({ id: d.id, ...(d.data() as Omit<LeaderboardEntry, 'id'>) })
    );
  }

  async createMentor(name: string, email: string, phone: string): Promise<MentorProfile> {
    const docRef = await addDoc(collection(this.db, 'mentors'), {
      name,
      email,
      phone,
    });
    return { id: docRef.id, name, email, phone };
  }

  async getMentors(): Promise<MentorProfile[]> {
    const snap = await getDocs(collection(this.db, 'mentors'));
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<MentorProfile, 'id'>),
    }));
  }

  async getAllChildren(): Promise<ChildProfile[]> {
    const snap = await getDocs(collection(this.db, 'childProfiles'));
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<ChildProfile, 'id'>),
    }));
  }

  assignMentor(mentorId: string, childId: string){
    return addDoc(collection(this.db, 'mentorChildLinks'), {mentorId, childId});
  }

  async getChildForMentor(mentorId: string): Promise<string[]> {
    const q = query(
      collection(this.db, 'mentorChildLinks'),
      where('mentorId', '==', mentorId)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => (d.data() as MentorChildLink).childId);
  }

  saveMentorRecord(data: MentorRecord) {
    return addDoc(collection(this.db, 'mentorRecords'), data);
  }

  async getMentorRecords(childId: string): Promise<MentorRecord[]> {
    const q = query(
      collection(this.db, 'mentorRecords'),
      where('childId', '==', childId),
      orderBy('dueDate', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(
      (d) => ({ id: d.id, ...(d.data() as Omit<MentorRecord, 'id'>) })
    );
  }

  /**
   * Temporary fallback implementation for group point data. In a real
   * application, groups would be aggregated by Cloud Functions. This
   * method returns a static snapshot so the UI can render without the
   * backend service.
   */
  async getGroupPointSnapshot() {
    return [
      { id: 'A', name: 'Group A', points: 12000 },
      { id: 'B', name: 'Group B', points: 9500 },
      { id: 'C', name: 'Group C', points: 7000 },
      { id: 'D', name: 'Group D', points: 4000 },
    ];
  }
}
