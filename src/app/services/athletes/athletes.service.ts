import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  public headers: Headers;
  public environment:any = environment.sportsRestApiHost;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  public getAthletes() {
    return this.http
      .get(this.environment + "/api/v1/athletes", { headers: this.headers })
      .pipe(map(res => res.json()));
  }
}
