import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public location: Location
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isCurrentUserAuthenticated()) {
      return true;
    }

    const returnUrl = this.location.path();

    if (returnUrl) {
      this.router.navigate(['/login'], {queryParams: {'return-url': this.location.path()}});
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
