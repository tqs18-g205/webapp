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

import { DataService } from './data.service';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlateListComponent,
    RestaurantListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DataService,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
