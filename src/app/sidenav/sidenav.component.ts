import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );
  isIndigoTheme: boolean = false;
  dir: string = 'ltr';
  user: SocialUser | null = new SocialUser();
  isLoggedin?: boolean = false;
  socialUser?: SocialUser | null;
  userName: string = '';
  photoUrl: string = '';
  isManager = false;
  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private sessionService: SessionService
  ) {
    // this.mediaMatcher.addListener((mql) =>
    //   zone.run(
    //     () =>
    //       (this.mediaMatcher = matchMedia(
    //         `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    //       ))
    //   )
    // );
  }

  ngOnInit() {
    this.socialUser = this.sessionService.getGoogleUser();
    if (this.socialUser) {
      this.isLoggedin = this.socialUser ? true : false;
      this.userName = this.socialUser.firstName;
      this.photoUrl = this.socialUser.photoUrl;
    }
    this.isManager = this.sessionService.getUserRole()===1?true:false
  }

  isScreenSmall(): boolean {
    return false;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  logOut(): void {
    this.authService
      .signOut()
      .then(() => {
        this.sessionService.clearAllInfos();
        this.router.navigate(['/login']);
      })
      .catch(() => {
        this.sessionService.clearAllInfos();
        this.router.navigate(['/login']);
      });
  }
}