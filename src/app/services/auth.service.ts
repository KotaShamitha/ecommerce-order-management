import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppUser } from '../models/user.model';
import { onAuthStateChanged } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null> (null);

  user$ = this.currentUserSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        const userProfile = await this.getUserProfile(user.uid);
        if (!userProfile || !userProfile.name) {
          this.router.navigate(['/profile']); 
        }
      }
    });
  }

  async register(email: string, password: string, name: string) {
    const UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = UserCredential.user;

    const userProfile: AppUser = {
      uid: user.uid,
      email: user.email!,
      name: name || "",
      phone: '',
      address: '',
      pinCode: '',
      role: 'user',
    };

    await setDoc(doc(this.firestore, `users/${user.uid}`), userProfile);
    return userProfile;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(this.firestore, `users/${user.uid}`));
    
    if (!userDoc.exists()) {
      await setDoc(doc(this.firestore, `users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        name: '',
        phone: '',
        address: '',
        pinCode: '',
        role: 'user',
      });
      this.router.navigate(['/profile']); 
    } else {
      const userData = userDoc.data();
      if (!userData['name'] || !userData['address']) {
        this.router.navigate(['/profile']); 
      } else {
        this.router.navigate(['/home']); 
      }
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  async getUserProfile(uid: string): Promise<AppUser | null> {
    const userDoc = await getDoc(doc(this.firestore, `users/${uid}`));
    return userDoc.exists() ? (userDoc.data() as AppUser): null;
  }

  getUserID(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }

  async getUserRole(uid: string): Promise<string> {
    const userProfile = await this.getUserProfile(uid);
    return userProfile && userProfile.role ? userProfile.role : 'user';
  }
}

