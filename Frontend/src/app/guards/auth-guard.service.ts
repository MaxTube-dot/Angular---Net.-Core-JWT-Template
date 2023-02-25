import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../auth/services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private authService: AuthService) {}

  canActivate() {
    //get the jwt token which are present in the local storage
    const token = localStorage.getItem("access_token");
    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.authService.startRefreshTokenTimer();
      return true;
    }
    this.router.navigate(["auth"]);
    return false;
  }
}
