import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  public headers: Headers;
  public environment: any = environment.sportsRestApiHost;

  constructor(private http: Http, private authService: AuthenticationService) {
    this.headers = new Headers();
    const userKey = authService.getCurrentUser().key;
    const key = 'Token ' + userKey;
    this.headers.append('Authorization', key);
    this.headers.append('Content-Type', 'application/json');
  }

  getSports() {
    return this.http
      .get(this.environment + '/api/v1/sports/', {
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }
}
