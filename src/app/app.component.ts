import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { profile } from 'console';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router){
    const user = this.authService.getCurrentUser();
    if(user) {
      this.isLoggedIn = true;
      this.authService.getUserProfile(user.uid).then(profile => {
        this.isAdmin = profile?.role === 'admin';
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
