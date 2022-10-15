import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedin?: boolean = false;
  socialUser?: SocialUser | null;
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.socialUser = this.sessionService.getGoogleUser();
    this.isLoggedin = this.socialUser ? true : false;
    if (this.isLoggedin) {
      this.router.navigate(['/main/schools'])
    } else {
      this.authService.authState.subscribe((user) => {
        this.socialUser = user;
        // this.isLoggedin = user != null;
        if (this.socialUser) {
          this.sessionService.putToken(user.idToken);
          this.userService
            .getUserByEmail(this.socialUser.email)
            .then((result) => {
              this.sessionService.putGoogleUser(user);
              this.sessionService.setUserSession(result);
              this.isLoggedin=true;
              this.router.navigate(['/main/schools']);
            })
            .catch((err) => {
              console.log(err);
              this.authService
                .signOut()
                .then((res) => {
                 console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
                this.sessionService.clearAllInfos();
                alert('Usuário não encontrado! Você será redirecionado para a área de cadastro!')
                this.router.navigate(['/registration'])
            });
        }
      });
    }
  }
}