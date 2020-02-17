import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Athlete } from "../../model/athletes.model";

@Injectable({
  providedIn: 'root'
})
export class AthletesService {
  public headers: Headers;
  public environment: any = environment.sportsRestApiHost;

  constructor(private http: Http, private authService: AuthenticationService) {
    this.headers = new Headers();
    const userKey = authService.getCurrentUser().key;
    const key = 'Token ' + userKey;
    this.headers.append('Authorization', key);
    this.headers.append('Content-Type', 'application/json');
  }

  public getAthletesByPagination(param) {
    return this.http
      .get(this.environment + '/api/v1/athletes/', {
        headers: this.headers,
        params: { page: param }
      })
      .pipe(map(res => res.json()));
  }

  public changePreviousNext(url) {
    return this.http
      .get(url, { headers: this.headers })
      .pipe(map(res => res.json()));
  }

  public getAthleteWithDetails(id) {
    return this.http
    .get(this.environment + '/api/v1/athletes/' + id + '/', {
      headers: this.headers }
     )
    .pipe(map(res => res.json()));
  }
}
