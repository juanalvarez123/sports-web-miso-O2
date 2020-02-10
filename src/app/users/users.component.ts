import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../services/users/users.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  registerForm: FormGroup;
  show_error = false;
  msj_error = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
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
  }

  public register() {
    var controls = this.registerForm.controls
    var $this = this;
    this.registerService.register(controls.username.value, controls.email.value, controls.password1.value, controls.password2.value, controls.name.value, controls.lastname.value)
      .pipe(first())
      .subscribe(data => {
        console.log(data)
      }, err => {
        $this.show_error = true;
        $this.msj_error = err._body
        console.error('Error API:', err._body)
      })
  }

}
