import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../services/athletes/athletes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {
  public athletes:any;
  public numberOfPages:any;
  public pagination:any;
  public data:any;

  constructor(private athletesService: AthletesService, private toastr:ToastrService) { 
  }


  ngOnInit() {
    this.athletesService.getAthletes().subscribe(data =>{
      this.data = data;
      this.athletes = data.results;
      console.log(data.results);
      this.numberOfPages = Math.ceil(data.count/6)
      this.pagination = Array(this.numberOfPages).fill(0)
    });
  }

  cambiar(pagina){
    if(pagina == 1){
      this.athletesService.getAthletes().subscribe(data =>{
        this.athletes = data.results;
        this.data = data;
      });
    }
    else{
      this.athletesService.getAthletesByPagination(pagina).subscribe(data =>{
        this.athletes = data.results;
        this.data = data;
      });
    }
  }

  next(){
    if(this.data.next){
      this.athletesService.next(this.data.next).subscribe(data =>{
        this.athletes = data.results;
        this.data = data;
      });
    }
    else{
      this.toastr.error('No existe una siguiente página');
    }
    
  }

  previous()
  {
    if(this.data.previous)
    {
      this.athletesService.previous(this.data.previous).subscribe(data =>{
        this.athletes = data.results;
        this.data = data;
      });
    }
    else{
      this.toastr.error('No existe una página previa');
    }
    
  }

}
