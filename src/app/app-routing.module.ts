import { NgModule } from '@angular/core';
import { AthletesComponent } from './athletes/athletes.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./helpers/auth.guard";
import { SettingsComponent } from "./settings/settings.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {path: 'athletes' , component: AthletesComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'athletes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
