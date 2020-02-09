import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AthletesComponent } from './athletes/athletes.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from './settings/settings.component';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    AthletesComponent,
    LoginComponent,
    HomeComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    HeaderModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
