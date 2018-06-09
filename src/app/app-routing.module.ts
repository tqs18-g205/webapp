import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListComponent } from './plate-list/plate-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: '', redirectTo: '/plates', pathMatch: 'full' },
  { path: 'plates', component: PlateListComponent },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
