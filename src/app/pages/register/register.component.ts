import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';

  constructor(private authService: AuthService, private router: Router) {} 
  async register() {
    await this.authService.register(this.email, this.password, this.name);
    this.router.navigate(['/profile']);
  }
}
