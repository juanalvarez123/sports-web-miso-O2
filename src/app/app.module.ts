import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AthletesComponent } from './athletes/athletes.component';
import { HttpModule } from '@angular/http';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    AthletesComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
