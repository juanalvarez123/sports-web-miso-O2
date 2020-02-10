import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./helpers/auth.guard";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from "./settings/settings.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
