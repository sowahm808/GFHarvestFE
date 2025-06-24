import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, UserCredential } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

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

  async createChildAccount(email: string, password: string, parentId: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await addDoc(collection(this.db, 'parentChildLinks'), { parentId, childId: cred.user.uid });
    return cred;
  }

  saveDailyCheckin(data: any) {
    return addDoc(collection(this.db, 'dailyCheckins'), data);
  }

  saveMentalStatus(data: any) {
    return addDoc(collection(this.db, 'mentalStatus'), data);
  }

  saveBibleQuiz(data: any) {
    return addDoc(collection(this.db, 'bibleQuizzes'), data);
  }

  saveEssay(data: any) {
    return addDoc(collection(this.db, 'essays'), data);
  }

  saveAcademicProgress(data: any) {
    return addDoc(collection(this.db, 'schoolWork'), data);
  }

  saveProject(data: any) {
    return addDoc(collection(this.db, 'projects'), data);
  }

  async getRandomBibleQuestion() {
    const snap = await getDocs(collection(this.db, 'bibleQuestions'));
    const docs = snap.docs;
    if (docs.length === 0) {
      return null;
    }
    const random = Math.floor(Math.random() * docs.length);
    return { id: docs[random].id, ...docs[random].data() };
  }
}
