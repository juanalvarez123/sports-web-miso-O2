import { Component, Input, OnInit } from '@angular/core';
import { Athlete, Participation, Comment } from "../model/athletes.model";
import { CommentService } from '../services/comments/comments.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})
export class ParticipationsComponent implements OnInit {
 
  commentsForm: FormGroup;
  returnUrl: string;
  public newComment: string;

  @Input() athlete: Athlete;

  public selectedParticipation: Participation = new Participation();
  
  constructor(
    
    private commentService: CommentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  )
  {} 
   

  ngOnInit(): void {
    this.selectedParticipation.commentaries = [];

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.commentsForm = this.fb.group({
      comment: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['return-url'] || '/';
  }

  public selectVideo(participation: Participation) : void {
    this.selectedParticipation = participation;
  }

  public addComment() {
    this.commentService.addComment(this.newComment, this.selectedParticipation.id)
      .pipe(first())
      .subscribe(data => {
        let com = { 
          comment: this.newComment,
          datetime: new Date(),
          participation: this.selectedParticipation.id,
        }
        this.selectedParticipation.commentaries.push(com)
      })
  }
}

