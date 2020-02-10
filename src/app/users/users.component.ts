import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../services/users/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  registerForm: FormGroup;
  show_error = false;
  returnUrl: string;
  msj_error = null;

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

  public register() {
    var controls = this.registerForm.controls 
    var $this = this;
    this.registerService.register(controls.username.value, controls.email.value, controls.password1.value, controls.password2.value, controls.name.value, controls.lastname.value)
      .pipe(first())
      .subscribe(data => {
        if (this.authenticationService.isCurrentUserAuthenticated()) {
          this.router.navigate(['home']);
        }
      }, err => {
        $this.show_error = true;
        $this.msj_error = err._body
      })
  }

}
