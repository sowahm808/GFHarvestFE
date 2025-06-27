import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  UserCredential,
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

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  async createChildAccount(
    email: string,
    password: string,
    parentId: string,
    age: number
  ) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await addDoc(collection(this.db, 'parentChildLinks'), {
      parentId,
      childId: cred.user.uid,
    });
    await setDoc(doc(this.db, 'childProfiles', cred.user.uid), { age });
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

  async sendNotification(parentId: string, message: string) {
    return addDoc(collection(this.db, 'notifications'), {
      parentId,
      message,
      date: new Date().toISOString(),
    });
  }

  async addPoints(childId: string, points: number) {
    const ref = doc(this.db, 'userStats', childId);
    await setDoc(ref, { points: increment(points) }, { merge: true });
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
}
