import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, UserCredential } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
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
}
