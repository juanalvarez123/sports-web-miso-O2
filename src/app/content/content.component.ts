import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  url = environment.sportsRestApiHost + '/login';

  constructor() { }

  ngOnInit() {
  }

}
