import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { AppUser } from '../../models/user.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: AppUser = {
    uid: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    pinCode: '',
    role: 'user'
  };

  constructor(private authService: AuthService, private firestore: Firestore) {}

  async saveProfile() {
    await setDoc(doc(this.firestore, `users/${this.user.uid}`), this.user, {merge: true});
    alert('Profile saved!');
  }
}
