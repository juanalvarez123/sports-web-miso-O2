import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LogoutService {
  public authToken: any;
  public headers: Headers;
  public url: any = environment.sportsRestApiHost;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  public logout() {
    return this.http
      .post(this.url + "/logout", { headers: this.headers })
      .pipe(map(res => res.json()));
  }
}
