import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  public headers: Headers;
  public environment: any = environment.sportsRestApiHost;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  register(username: string, email: string, password1: string, password2: string, name: string, lastname: string) {
    return this.http
      .post(this.environment + "/api/v1/registration/", { username, email, password1, password2, name, lastname}, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
}