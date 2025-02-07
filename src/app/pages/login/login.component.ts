import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }
    async login() {
      try {
        await this.authService.login(this.email, this.password);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Login failed', error);
      }
    }
}
