import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes/athletes.service';
import { ToastrService } from 'ngx-toastr';
import { Athlete, Modality, Sport } from "../model/athletes.model";
import { ModalitiesService } from "../services/sports/modalities.service";

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

  constructor(
    private athletesService: AthletesService,
    private toastrService: ToastrService,
    private modalitiesService: ModalitiesService
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

  // TODO, llamar a este método cuando se hace un cambio en el filtro de deportes
  public onChangeSport() : void {
    this.selectedModalityId = this.allRecords;

    if (this.selectedSportId === this.allRecords) {
      this.modalities = [];

      // TODO, aquí se debería llamar al servicio de busqueda de atletas SIN filtro de deporte
    } else {
      this.modalitiesService.getModalitiesBySport(this.selectedSportId).subscribe(data => {
        this.modalities = data;

        // TODO, aquí se debería llamar a servicio de busqueda de atletas usando SOLO el valor de 'selectedSportId'
      });
    }
  }

  // TODO, llamar al servicio de busqueda de atletas por el deporte seleccionado y la modalidad seleccionada usando
  //  los valores de 'selectedSportId' y 'selectedModalityId'. Si el valor de 'selectedModalityId' es "-1" no hay que
  //  enviar el filtro de modalidad
  public onChangeModality() : void {
    console.log(this.selectedModalityId);
  }
}
