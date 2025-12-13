import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { LoginPage } from './features/login/pages/login-page/login-page';
import { RegisterPage } from './features/register/pages/register-page/register-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage }, // !CanDeactive guard will be added later!
    { path: 'profile/:username', component: ProfilePage }, // !CanActive + CanDeactive will be added later!


    { path: '**', redirectTo: 'home' } // always keep last!
];

