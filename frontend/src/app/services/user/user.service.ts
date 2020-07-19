import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignupUrl = 'http://127.0.0.1:5000/api/users/create';
  userLoginUrl = 'http://127.0.0.1:5000/api/users/login';
  isAdminUrl = 'http://127.0.0.1:5000/api/users/is-admin';
  _loginObservable: BehaviorSubject<Object>;

  constructor(private http: HttpClient) {
    this._loginObservable = new BehaviorSubject({});
  }

  public get loginObservable() {
    return this._loginObservable;
  }

  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem('token', 'Bearer ' + token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this._loginObservable.next({});
  }

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  isLoggedIn() {
    if (this.getToken() != '') {
      return true;
    }
    return false;
  }

  isAdmin() {
    return this.http.get(this.isAdminUrl);
    // .pipe(
    //   map((result) => {
    //     return <boolean>result;
    //   })
    // );
  }

  signup(user: User) {
    return this.http.post(this.userSignupUrl, user).pipe(
      map((result) => {
        return <{ message: string }>result;
      })
    );
  }
  login(credentials: { email: string; password: string }) {
    return this.http.post(this.userLoginUrl, credentials).pipe(
      map((result: loginResponse) => {
        this.saveTokenToLocalStorage(result.token);
        this._loginObservable.next({});
        return result;
      })
    );
  }
}

interface loginResponse {
  token: string;
  message: string;
}
