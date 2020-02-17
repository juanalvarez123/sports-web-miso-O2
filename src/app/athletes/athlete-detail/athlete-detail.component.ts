import { Component, Input, OnInit } from '@angular/core';
import { Athlete } from "../../model/athletes.model";

@Component({
  selector: 'app-athlete-detail',
  templateUrl: './athlete-detail.component.html',
  styleUrls: ['./athlete-detail.component.css']
})
export class AthleteDetailComponent implements OnInit {

  @Input() athlete: Athlete;

  constructor() { }

  ngOnInit(): void {
  }
}
