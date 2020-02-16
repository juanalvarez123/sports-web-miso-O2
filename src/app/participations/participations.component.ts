import { Component, Input, OnInit } from '@angular/core';
import { Athlete, Participation } from "../model/athletes.model";

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})
export class ParticipationsComponent implements OnInit {

  @Input() athlete: Athlete;

  public selectedParticipation: Participation = new Participation();

  constructor() { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  public selectVideo(participation: Participation) : void {
    this.selectedParticipation = participation;
  }
}
