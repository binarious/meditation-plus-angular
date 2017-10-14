import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { JwtHelper } from 'angular2-jwt';

const jwtHelper: JwtHelper = new JwtHelper();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (window.localStorage.getItem('token') &&
      !jwtHelper.isTokenExpired(window.localStorage.getItem('token'))) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
