import { AuthGuard } from './auth.guard';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService, UtilitiesService } from './_services';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlateListComponent,
    RestaurantListComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataService,
    UtilitiesService,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    RouterModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
