import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListComponent } from './plate-list/plate-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/plates', pathMatch: 'full' },
  { path: 'plates', component: PlateListComponent },
  { path: 'restaurants', component: RestaurantListComponent,
    canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
