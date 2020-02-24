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
  public sportsList: Sport[] = [];
  public numberOfPages: any;
  public pagination: any;
  public data: any;

  public allRecords: number = -1;
  public firstPage: number = 1;
  public maxAthletesByPage: number = 6;

  public showAthleteDetail: boolean = false;
  public selectedAthlete: Athlete = new Athlete();
  public selectedModalityId: number = this.allRecords;
  public selectedSportId: number = this.allRecords;

  constructor(
    private athletesService: AthletesService,
    private toastrService: ToastrService,
    private modalitiesService: ModalitiesService,
    private sportsService: SportsService
  ) {}

  ngOnInit() {
    this.athletesService.getAthletesByPagination(this.firstPage).subscribe(data => {
      this.processAthletesResults(data);
    });

    this.sportsService.getSports().subscribe(sports => {
      this.sportsList = sports;
    });
  }

  change(page) {
    if (this.selectedSportId == this.allRecords && this.selectedModalityId == this.allRecords) {
      this.athletesService.getAthletesByPagination(page).subscribe(data => {
        this.processAthletesResults(data);
      });
    } else if (this.selectedSportId != this.allRecords && this.selectedModalityId == this.allRecords) {
      this.athletesService.getAthletesFilteredBySport(this.selectedSportId, page).subscribe(data => {
        this.processAthletesResults(data);
      });
    } else if (this.selectedSportId != this.allRecords && this.selectedModalityId != this.allRecords) {
      this.athletesService.getAthletesFilteredBySportAndModality(this.selectedSportId, this.selectedModalityId, page)
      .subscribe(data => {
        this.processAthletesResults(data);
      });
    }
  }

  next() {
    if (this.data.next) {
      this.athletesService
        .changePreviousNext(this.data.next)
        .subscribe(data => {
          this.processAthletesResults(data);
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
          this.processAthletesResults(data);
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
      this.athletesService
        .getAthletesByPagination(this.firstPage)
        .subscribe(data => {
          this.processAthletesResults(data);
        });
    } else {
      this.modalitiesService
        .getModalitiesBySport(this.selectedSportId)
        .subscribe(data => {
          this.modalities = data;
          this.getAthletesBySportId(this.selectedSportId);
        });
    }
  }

  private getAthletesBySportId(sportId: number): void {
    this.athletesService.getAthletesFilteredBySport(sportId, this.firstPage)
      .subscribe(data => {
        this.processAthletesResults(data);
      });
  }

  public onChangeModality(): void {
    if (this.selectedModalityId == this.allRecords) {
      this.getAthletesBySportId(this.selectedSportId);
    } else {
      this.athletesService.getAthletesFilteredBySportAndModality(
          this.selectedSportId,
          this.selectedModalityId,
          this.firstPage
        )
        .subscribe(data => {
          this.processAthletesResults(data);
        });
    }
  }

  private processAthletesResults(data: any): void {
    this.athletes = data.results;
    this.data = data;
    this.numberOfPages = Math.ceil(data.count / this.maxAthletesByPage);
    this.pagination = Array(this.numberOfPages).fill(0);
  }
}
