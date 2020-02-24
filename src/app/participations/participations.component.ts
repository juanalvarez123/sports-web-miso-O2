import { Component, Input, OnInit } from '@angular/core';
import { Athlete, Participation } from "../model/athletes.model";
import { CommentService } from '../services/comments/comments.service';
import { first } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})
export class ParticipationsComponent implements OnInit {

  public newComment: string;

  @Input() athlete: Athlete;

  public selectedParticipation: Participation = new Participation();

  constructor(
    private commentService: CommentService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.selectedParticipation.commentaries = [];
  }

  public selectVideo(participation: Participation): void {
    this.selectedParticipation = participation;
  }

  public addComment() {
    this.commentService.addCommentary(this.newComment, this.selectedParticipation.id)
    .pipe(first())
    .subscribe(data => {
      let commentary = {
        comment: this.newComment,
        datetime: new Date(),
        user: this.authenticationService.getCurrentUser().user
      };
      this.selectedParticipation.commentaries.push(commentary);
      this.newComment = '';
    });
  }
}

