import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { LoginPage } from './features/auth/pages/login/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register/register-page/register-page';
import { ProfileInfoPage } from './features/profile/pages/profile-info-page/profile-info-page';
import { unsavedLeaveGuard } from './features/auth/pages/register/guards/unsaved-leave-guard';
import { PublicLayout } from './layout/public-layout/public-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { ToursPage } from './features/tours/pages/tours-page/tours-page';
import { ProfileLayout } from './layout/profile-layout/profile-layout';
import { ProfileSettingsPage } from './features/profile/pages/profile-settings-page/profile-settings-page';
import { ProfileBookingsPage } from './features/profile/pages/profile-bookings-page/profile-bookings-page';
import { canActiveGuard } from './features/profile/guards/can-active-guard';
import { GuidesPage } from './features/guides/pages/guides-page/guides-page';
import { SelectedTourPage } from './features/tours/pages/selected-tour-page/selected-tour-page';
import { canEnterGuard } from './features/tours/guards/can-enter-guard';
import { NotFoundPage } from './features/not-found/pages/not-found-page/not-found-page';

export const routes: Routes = [
    { 
        path: '', 
        component: PublicLayout,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePage },
            { path: 'tours', children: [
                { path: '', component: ToursPage },
                { 
                path: ':title', 
                component: SelectedTourPage, 
                data: { title: 'current tour', showHeader: false },
                canActivate: [canEnterGuard]
                }
            ] },
            { path: 'guides', component: GuidesPage }
        ]
    },
    {
        path: 'auth', 
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginPage },
            { path: 'register', component: RegisterPage, canDeactivate: [unsavedLeaveGuard] }
        ]
    },
    { 
        path: 'profile/:slug',
        component: ProfileLayout,
        canActivate: [canActiveGuard],
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: ProfileInfoPage },
            { path: 'settings', component: ProfileSettingsPage },
            { path: 'bookings', component: ProfileBookingsPage}
        ]
    }, // !CanActive + CanDeactive will be added later!


    { path: 'not-found', component: NotFoundPage },
    { path: '**', redirectTo: 'home' } // always keep last!
];

