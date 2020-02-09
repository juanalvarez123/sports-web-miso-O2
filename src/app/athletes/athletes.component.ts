import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes/athletes.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {
  public athletes:any;
  public numberOfPages:any;
  public pagination:any;

  constructor(public athletesService: AthletesService) { 
  }

  ngOnInit() {
    this.athletesService.getAthletes().subscribe(data =>{
      this.athletes = data.results;
      this.numberOfPages = Math.ceil(data.count/6)
      this.pagination = Array(this.numberOfPages).fill(0)
    });
  }

}
