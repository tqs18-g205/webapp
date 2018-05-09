import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';

import { MatSliderModule } from '@angular/material';

import { NavbarComponent } from './navbar/navbar.component';
import { PlateListComponent } from './plate-list/plate-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http'; 

import { PlateService } from './plate.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlateListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PlateService,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
