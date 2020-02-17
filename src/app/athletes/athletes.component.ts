import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes/athletes.service';
import { ToastrService } from 'ngx-toastr';
import { Athlete, Participation } from "../model/athletes.model";

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {
  public athletes: Athlete[] = [];
  public numberOfPages: any;
  public pagination: any;
  public data: any;

  public showAthleteDetail: boolean = false;
  public selectedAthlete: Athlete = new Athlete();

  constructor(
    private athletesService: AthletesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const firstPage = 1;
    const maxAthletesByPage = 6;
    this.athletesService.getAthletesByPagination(firstPage).subscribe(data => {
      this.athletes = data.results;
      this.data = data;
      this.numberOfPages = Math.ceil(data.count / maxAthletesByPage);
      this.pagination = Array(this.numberOfPages).fill(0);
    });
  }

  change(page) {
    this.athletesService.getAthletesByPagination(page).subscribe(data => {
      this.athletes = data.results;
      this.data = data;
    });
  }

  next() {
    if (this.data.next) {
      this.athletesService
        .changePreviousNext(this.data.next)
        .subscribe(data => {
          this.athletes = data.results;
          this.data = data;
        });
    } else {
      this.toastr.error('No existe una siguiente página', '', {
        positionClass: 'toast-bottom-right'
      });
    }
  }

  previous() {
    if (this.data.previous) {
      this.athletesService
        .changePreviousNext(this.data.previous)
        .subscribe(data => {
          this.athletes = data.results;
          this.data = data;
        });
    } else {
      this.toastr.error('No existe una página previa', '', {
        positionClass: 'toast-bottom-right'
      });
    }
  }

  public showAthleteParticipations(athlete: Athlete) : void {
    this.athletesService.getAthleteWithDetails(athlete.id)
    .subscribe(data => {
      this.selectedAthlete = data;
      this.showAthleteDetail = true;
    });
  }

  public closeAthleteParticipations() : void {
    this.selectedAthlete = new Athlete();
    this.showAthleteDetail = false;
  }
}
