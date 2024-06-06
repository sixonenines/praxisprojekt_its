import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();
  public isLoggedIn: Observable<boolean> = this.currentUser.pipe(map(user => !!user));

  private apiUrl = `http:localhost:5000/`;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn = this.currentUser.pipe(map(user => !!user));
  }

  getCurrentUser(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.username : null;
  }  

  getCurrentUserToken(): string | null {
    return this.currentUserSubject.value ? this.currentUserSubject.value.token : null;
  }

  signup(username: string, password: string) {
    return this.http.post<any>('http://localhost:5000/signup', { username, password })
      .pipe(
        catchError(error => {
          console.error('Signup error', error);
          return throwError(error);;
        })
      );
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:5000/login', { username, password })
      .pipe(
        map(response => {
          if (response && response.data.user_id && response.data.token, response.data.experience) {
            const username = response.data.user_id;
            const token  = response.data.token;
            const experience = response.data.experience;
            localStorage.setItem('currentUser', JSON.stringify({ username, token, experience }));
            this.currentUserSubject.next({ username, token, experience});
            return { username, token };
          } else {
            throw new Error('No token received');
          }
        }),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }

  logout() {
    console.log("test")
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/signup']);
    console.log("Logged out");
  }
}





