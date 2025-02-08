import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    // { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    // { path: '**', redirectTo: 'home'}

    { path: 'home', loadComponent: () => import('../app/pages/home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
    { path: 'login', loadComponent: () => import('../app/pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('../app/pages/register/register.component').then(m => m.RegisterComponent) },
    { path: 'profile', loadComponent: () => import('../app/pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard] },
    { path: 'cart', loadComponent: () => import('../app/pages/cart/cart.component').then(m => m.CartComponent), canActivate: [AuthGuard] },
    { path: 'orders', loadComponent: () => import('../app/pages/orders/orders.component').then(m => m.OrdersComponent), canActivate: [AuthGuard] },
    { path: 'admin', loadComponent: () => import('../app/pages/admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard, AdminGuard] },
    { path: '**', redirectTo: 'home' }

];
