import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes/athletes.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {

  constructor(public athletesService: AthletesService) { 
  }

  ngOnInit() {
    this.athletesService.getAthletes().subscribe(data =>{
      console.log(data);
    });
  }

}
