import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../services/users/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Component({
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  show_error = false;
  returnUrl: string;
  msj_error = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['return-url'] || '/';

    if (this.authenticationService.isCurrentUserAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  public register() {
    this.submitted = true;
    this.show_error = false;

    if (this.registerForm.invalid || !this.areTheSamePasswords()) {
      return;
    }

    let controls = this.registerForm.controls;
    this.registerService.register(controls.username.value, controls.email.value, controls.password1.value, controls.password2.value, controls.name.value, controls.lastname.value)
      .pipe(first())
      .subscribe(data => {
        this.authenticationService.createNewAuthenticatedUser({key: data.key});
        this.router.navigate(['athletes']);
      }, err => {
        this.show_error = true;
        this.msj_error = err._body;
        let msj2 = this.msj_error.split('"');
        this.msj_error = msj2[3]
      })
  }

  areTheSamePasswords() {
    let pass = this.registerForm.get('password1').value;
    let confirmPass = this.registerForm.get('password2').value;

    if (pass !== confirmPass) {
      this.show_error = true;
      this.msj_error = 'Las contraseñas no son iguales';
    }

    return pass === confirmPass ? true : false;
  }
}
