import { Component } from '@angular/core';
import { AuthenticationService } from "./services/authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }
}
