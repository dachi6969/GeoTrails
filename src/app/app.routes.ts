import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { LoginPage } from './features/auth/pages/login/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register/register-page/register-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { unsavedLeaveGuard } from './features/auth/pages/register/guards/unsaved-leave-guard';
import { PublicLayout } from './layout/public-layout/public-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
    { 
        path: '', 
        component: PublicLayout,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePage },
        ]
    },
    {
        path: 'auth', 
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'logic', pathMatch: 'full' },
            { path: 'login', component: LoginPage },
            { path: 'register', component: RegisterPage, canDeactivate: [unsavedLeaveGuard] }
        ]
    },
    { path: 'profile/:username', component: ProfilePage }, // !CanActive + CanDeactive will be added later!


    { path: '**', redirectTo: 'home' } // always keep last!
];

