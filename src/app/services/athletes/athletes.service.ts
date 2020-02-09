import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  public headers: Headers;
  public environment:any = environment.sportsRestApiHost;

  constructor(public http:Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  public getAthletes() {
    return this.http
      .get(this.environment + "/api/v1/athletes", { headers: this.headers })
      .pipe(map(res => res.json()));
  }

  public getAthletesByPagination(param){
    return this.http
    .get(this.environment + "/api/v1/athletes/", { headers: this.headers, params: {"offset":param}})
    .pipe(map(res => res.json()));
  }

  public previous(url)
  {
    return this.http
    .get(url, { headers: this.headers})
    .pipe(map(res => res.json()));
  }

  public next(url){
    return this.http
    .get(url, { headers: this.headers})
    .pipe(map(res => res.json()));
  }

  
}
