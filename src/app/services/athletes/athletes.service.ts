import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

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
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }

  public getFilteredSportsAndModalities(idSport, idModality, pages) {
    const param2 = {
      participation__modality__sport: idSport,
      participation__modality: idModality,
      page: pages
    };
    return this.http
      .get(this.environment + '/api/v1/athletes/', {
        headers: this.headers,
        params: param2
      })
      .pipe(map(res => res.json()));
  }

  public getFilteredSports(idSport){
    const param = {
      participation__modality__sport: idSport,
    };
    return this.http
      .get(this.environment + '/api/v1/athletes/', {
        headers: this.headers,
        params: param
      })
      .pipe(map(res => res.json()));
  }
}
