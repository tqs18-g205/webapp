import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from './_services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private dataService: DataService) { }

  canActivate() {
    if (!this.dataService.loggedIn()) {
      return true;
     }

    this.router.navigate(['/login']);
    return false;
  }
}
