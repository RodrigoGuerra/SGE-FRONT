import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent implements OnInit {
  user: SocialUser | null = new SocialUser();
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
    if (!this.isLoggedin) this.router.navigate(['login']);
  }
}