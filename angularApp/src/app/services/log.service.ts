import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoggingService {
    constructor(private http: HttpClient, private router: Router) {}

  updateLogs(data: { [key: string]: any }) {
    console.log('Service method called!');
    return this.http.post<any>('http://localhost:5000/upload_logged_data', data )
      .pipe(
        catchError(error => {
          console.error('Signup error', error);
          return error;
        })
      );
  }
}


/*loggingService.updateLogs("data").subscribe(
  response => {
      console.log('Log update successful', response);
    },
    error => {
      console.error('Log update failed', error);
    }
  );
*/