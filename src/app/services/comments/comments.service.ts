import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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

  addComment(comment: string, participationId: number) {
    return this.http
      .post(this.environment + "/api/v1/commentaries/",
         {
            comment: comment,
            participation: participationId,
            user: 1
// TO DO: La variable user queda pendiente debido a que no existe en el backend, por el momento esta quemada,
//        y lo ideal es quede como la siguiente linea
//            user: this.authService.getCurrentUser().participationId
          }, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
}

  
