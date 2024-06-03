import { Routes } from '@angular/router';
import { TutorComponentComponent } from './tutor-component/tutor-component.component'; 
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [{ path: 'tutor', component: TutorComponentComponent }, { path: 'signup', component: SignupComponent },
];
