import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.min(2)]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['return-url'] || '/';

    if (this.authenticationService.isCurrentUserAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  public login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = 'Credenciales inválidas';
        this.loading = false;
      });
  }
}
