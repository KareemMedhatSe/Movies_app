import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SignupPageComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard],data: { role: 'ADMIN' } },
  { path: 'user', component: UserDashboardComponent, canActivate: [AuthGuard],data: { role: 'USER' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
