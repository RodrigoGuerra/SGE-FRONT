import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isLoggedin?: boolean = false;
  socialUser?: SocialUser | null;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.socialUser = this.sessionService.getGoogleUser();
    this.isLoggedin = this.socialUser ? true : false;
    console.log(this.socialUser);
    if (this.isLoggedin) {
      this.router.navigate(['/main/schools']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
