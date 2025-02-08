import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      switchMap(async (user) => {
        if (user) {
          const userProfile = await this.authService.getUserProfile(user.uid);
          if (!userProfile || !userProfile.name || !userProfile.address) {
            return this.router.createUrlTree(['/profile']);
          }
          if (route.routeConfig?.path === 'admin' && userProfile.role !== 'admin') {
            return this.router.createUrlTree(['/home']);
          }
          return true;
        }
        return this.router.createUrlTree(['/login']);
      }),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
