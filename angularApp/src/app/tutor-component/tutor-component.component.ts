import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggingService } from '../services/log.service';
import { AuthService } from '../services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
interface Experience {
  name: string;
}
@Component({
  selector: 'app-tutor-component',
  standalone: true,
  imports: [RouterOutlet,DropdownModule, FormsModule],
  templateUrl: './tutor-component.component.html',
  styleUrl: './tutor-component.component.sass'
})



export class TutorComponentComponent implements OnInit{
  experienceLevel : Experience[] = [
    {name: "Beginner"},
    {name: "Advanced"},
    {name: "Expert"},
  ];
  currentUser= localStorage.getItem("currentUser")
  currentUserInfo= this.currentUser ? JSON.parse(this.currentUser) : null;
  currentUsername: String = this.currentUserInfo.username;
  selectedExperienceLevel: Experience = this.experienceLevel[0];

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
  onDifficultyChange() {
  console.log('Selected Difficulty:', this.selectedExperienceLevel.name);
    const StoredUser= localStorage.getItem("currentUser")
    const UserInfoJson= StoredUser ? JSON.parse(StoredUser) : null;
    const experienceLevel = String(this.selectedExperienceLevel.name);
    const username = String(UserInfoJson.username);
    const userid = String(UserInfoJson.userid);
    const token = String(UserInfoJson.token);
    this.authservice.changeExperienceLevel(userid,username,token,experienceLevel).subscribe();
  }
}
