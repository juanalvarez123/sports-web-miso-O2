import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes/athletes.service';
import { ToastrService } from 'ngx-toastr';
import { Athlete, Modality, Sport } from '../model/athletes.model';
import { ModalitiesService } from '../services/sports/modalities.service';
import { SportsService } from '../services/sports/sports.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {
  public athletes: Athlete[] = [];
  public sports: Sport[] = [];
  public modalities: Modality[] = [];
  public numberOfPages: any;
  public pagination: any;
  public data: any;

  public allRecords: number = -1;
  public showAthleteDetail: boolean = false;
  public selectedAthlete: Athlete = new Athlete();
  public selectedModalityId: number = this.allRecords;
  public selectedSportId: number = this.allRecords;

  public sportsList: any;
  public maxAthletesByPage = 6;

  constructor(
    private athletesService: AthletesService,
    private toastrService: ToastrService,
    private modalitiesService: ModalitiesService,
    private sportsService: SportsService
  ) {}

  ngOnInit() {
    const firstPage = 1;
    this.athletesService.getAthletesByPagination(firstPage).subscribe(data => {
      this.athletes = data.results;
      this.data = data;
      this.numberOfPages = Math.ceil(data.count / this.maxAthletesByPage);
      this.pagination = Array(this.numberOfPages).fill(0);
    });
    this.sportsService.getSports().subscribe(sports => {
      this.sportsList = sports;
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
      this.toastrService.error('No existe una siguiente página', '', {
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
      this.toastrService.error('No existe una página previa', '', {
        positionClass: 'toast-bottom-right'
      });
    }
  }

  public showAthleteParticipations(athlete: Athlete): void {
    this.athletesService.getAthleteWithDetails(athlete.id).subscribe(data => {
      this.selectedAthlete = data;
      this.showAthleteDetail = true;
    });
  }

  public closeAthleteParticipations(): void {
    this.selectedAthlete = new Athlete();
    this.showAthleteDetail = false;
  }


  public onChangeSport(): void {
    this.selectedModalityId = this.allRecords;
    if (this.selectedSportId == this.allRecords) {
      this.modalities = [];
      const firstPage = 1;
      this.athletesService
        .getAthletesByPagination(firstPage)
        .subscribe(data => {
          this.athletes = data.results;
          this.data = data;
        });
    } else {
      this.modalitiesService
        .getModalitiesBySport(this.selectedSportId)
        .subscribe(data => {
          this.modalities = data;
          this.getAthletesBySportId(this.selectedSportId);
          this.data = data;
        });
    }
  }

  getAthletesBySportId(sportId) {
    this.athletesService
      .getFilteredSports(this.selectedSportId)
      .subscribe(filteredAthletes => {
        this.athletes = filteredAthletes.results;
        this.numberOfPages = Math.ceil(
          filteredAthletes.count / this.maxAthletesByPage
        );
        this.pagination = Array(this.numberOfPages).fill(0);
        this.data = filteredAthletes;
      });
  }

  public onChangeModality(): void {
    if (this.selectedModalityId === this.allRecords) {
      this.getAthletesBySportId(this.selectedSportId);
    } else {
      this.athletesService
        .getFilteredSportsAndModalities(
          this.selectedSportId,
          this.selectedModalityId,
          1
        )
        .subscribe(athletes => {
          this.athletes = athletes.results;
          this.numberOfPages = Math.ceil(
            athletes.count / this.maxAthletesByPage
          );
          this.pagination = Array(this.numberOfPages).fill(0);
          this.data = athletes;
        });
    }
  }
}
