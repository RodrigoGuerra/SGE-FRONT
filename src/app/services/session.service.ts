import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  /**
   * name
   */
  public putGoogleUser(socialUser: SocialUser) {
    sessionStorage.setItem('user', JSON.stringify(socialUser));
  }
  public getGoogleUser(): SocialUser | null {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr) as SocialUser;
    return null;
  }
  public isLogged(): boolean {
    return sessionStorage.getItem('user') ? true : false;
  }
  public removeGoogleUser() {
    sessionStorage.removeItem('user');
  }

  public putToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return sessionStorage.getItem('token')
  }
  public clearAllInfos(){
    sessionStorage.clear()
  }

  public setUserSession(user:User){
    sessionStorage.setItem('userSession',JSON.stringify(user))
  }
  
  public getUserIdSession(): string{
    const userStr= sessionStorage.getItem('userSession');
    if(!userStr) return ""
    const user= JSON.parse(userStr) as User;
    return user.userId;
  }

  public getUserRole(): number{
    const userStr= sessionStorage.getItem('userSession');
    if(!userStr) return 2
    const user= JSON.parse(userStr) as User;
    return user.roleId;
  }
}