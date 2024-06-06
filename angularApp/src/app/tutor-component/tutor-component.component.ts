import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggingService } from '../services/log.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tutor-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tutor-component.component.html',
  styleUrl: './tutor-component.component.sass'
})
export class TutorComponentComponent implements OnInit{
  constructor(private loggingService: LoggingService, private authservice: AuthService) {}

  ngOnInit(): void {
    (window as any).loggingService = this.loggingService;
    (window as any).logHelperFunction = function(data: { [key: string]: any }) {
      this.loggingService.updateLogs(data).subscribe(
        (response:any) => {
          console.log('Log update successful', response);
        },
        (error: any) => {
          console.error('Log update failed', error);
  }
);
}
}
  logout(): void {
    this.authservice.logout();
  }
}