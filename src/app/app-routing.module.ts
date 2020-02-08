import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthletesComponent } from './athletes/athletes.component';

const routes: Routes = [
  {path: 'athletes' , component: AthletesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
