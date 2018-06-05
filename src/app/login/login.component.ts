import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DataService } from '../_services';
import { Client } from '../_models';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.logout();
  }

  login(username: string, password: string) {
    this.dataService.login({ username: username, passwd: password }).pipe(first())
      .subscribe(
        data => {
          window.location.href = '/';
        },
        error => {
          alert('Login Inválido!');
        });
  }

  register(nome: string, passwd: string, email: string, nif: string, street: string, region: string, zipcode: string, county: string) {
    const client = <Client>{};
    this.dataService.addClient(client);
  }
}
