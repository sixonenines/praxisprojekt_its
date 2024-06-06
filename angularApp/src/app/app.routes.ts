import { Routes } from '@angular/router';
import { TutorComponentComponent } from './tutor-component/tutor-component.component'; 
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    {path: '',   redirectTo: '/welcome', pathMatch: 'full'},
    {path: 'tutor', component: TutorComponentComponent },
    {path: 'signup', component: SignupComponent },
    {path: 'welcome', component: WelcomeComponent },
];
