import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let flag = false;
    //  console.log('user Auth guard');

    if (this.userService.isLoggedIn()) {
      flag = true;
    } else {
      this.router.navigate(['login']);
    }
    return flag;
  }
}
