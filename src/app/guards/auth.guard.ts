// src/app/guards/auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      map((user) => {
        if (user) {
          return true; 
        } else {
          return this.router.createUrlTree(['/login']); 
        }
      }),
      catchError(() => of(this.router.createUrlTree(['/login']))) 
    );
  }
}
