import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { AuthenticationResponse } from "../../model/authentication.model";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AuthenticationResponse>;
  private currentUser: Observable<AuthenticationResponse>;
  readonly CURRENT_USER: string = "currentUser";

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthenticationResponse>(
      JSON.parse(localStorage.getItem(this.CURRENT_USER))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUser(): AuthenticationResponse {
    return this.currentUserSubject.value;
  }

  public isCurrentUserAuthenticated(): boolean {
    return this.currentUserSubject.value != null;
  }

  login(username: string, email: string, password: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post<any>(
        `${environment.sportsRestApiHost}/api/v1/login/`,
        { username, email, password },
        { headers }
      )
      .pipe(
        map(user => {
          localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      JSON.parse(localStorage.getItem("currentUser")).key
    );
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUserSubject.next(null);
    return this.http
      .post(`${environment.sportsRestApiHost}/api/v1/logout/`, {
        headers: headers
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
