import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
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
