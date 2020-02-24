import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class CommentService {
  public headers: Headers;
  public environment: any = environment.sportsRestApiHost;

  constructor(private http: Http, private authService: AuthenticationService,) {
    this.headers = new Headers();
    const userKey = authService.getCurrentUser().key;
    const key = 'Token ' + userKey;
    this.headers.append('Authorization', key);
    this.headers.append('Content-Type', 'application/json');
  }

  public addCommentary(comment: string, participationId: number) {
    return this.http
    .post(this.environment + "/api/v1/commentaries/",
      {
        comment: comment,
        participation: participationId,
        user: this.authService.getCurrentUser().user.id
      }, { headers: this.headers })
    .pipe(map(res => res.json()));
  }
}


