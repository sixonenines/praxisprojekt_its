import { Routes } from '@angular/router';
import { TutorComponentComponent } from './tutor-component/tutor-component.component'; 
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { loggedInGuardGuard } from './guards/loggedInGuardGuard';

export const routes: Routes = [
    {path: '',   redirectTo: '/welcome', pathMatch: 'full'},
    {path: 'tutor',
    component: TutorComponentComponent,
    canActivate: [loggedInGuardGuard],
    },
    {path: 'signup', component: SignupComponent },
    {path: 'welcome', component: WelcomeComponent },
];