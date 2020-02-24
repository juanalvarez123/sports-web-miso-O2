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

  public getAthletesByPagination(page: number) {
    return this.http
      .get(this.environment + '/api/v1/athletes/', {
        headers: this.headers,
        params: { page: page }
      })
      .pipe(map(res => res.json()));
  }

  public changePreviousNext(url) {
    return this.http
      .get(url, { headers: this.headers })
      .pipe(map(res => res.json()));
  }

  public getAthleteWithDetails(id: number) {
    return this.http
      .get(this.environment + '/api/v1/athletes/' + id + '/', {
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }

  public getAthletesFilteredBySportAndModality(idSport: number, idModality: number, page: number) {
    const params = {
      participation__modality__sport: idSport,
      participation__modality: idModality,
      page: page
    };
    return this.http
      .get(this.environment + '/api/v1/athletes/', {
        headers: this.headers,
        params: params
      })
      .pipe(map(res => res.json()));
  }

  public getAthletesFilteredBySport(idSport: number, page: number) {
    const params = {
      participation__modality__sport: idSport,
      page: page
    };
    return this.http
      .get(this.environment + '/api/v1/athletes/', {
        headers: this.headers,
        params: params
      })
      .pipe(map(res => res.json()));
  }
}
