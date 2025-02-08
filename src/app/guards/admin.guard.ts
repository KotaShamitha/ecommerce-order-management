import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return from(this.authService.getUserRole(this.authService.getUserID() || '')).pipe(
      map((role) => {
        return role === 'admin' ? true : this.router.createUrlTree(['/home']);
      })
    );
  }
}
