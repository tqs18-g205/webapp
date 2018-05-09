import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListComponent } from './plate-list/plate-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/plates', pathMatch: 'full' },
  { path: 'plates', component: PlateListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
