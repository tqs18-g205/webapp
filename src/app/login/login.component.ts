import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DataService } from '../_services';
import { Client, Address } from '../_models';
import { Router } from '@angular/router';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.logout();
  }

  login(username: string, password: string) {
    this.dataService.login({ username: username, passwd: password }).pipe(first())
      .subscribe(
      data => {
        this.router.navigate(['/']);
        },
        error => {
          alert('Invalid Login!');
        });
  }

  register(nome: string, passwd: string, email: string, nif: string, street: string, region: string, zipcode: string, county: string) {
    const address = <Address>{
      rua: street, localidade: region,
      codigoPostal: zipcode, distrito: county
    };
    const client = <Client>{
      nome: nome, passwd: passwd,
      nif: nif, email: email,
      morada: address
    };
    this.dataService.addClient(client).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        alert('Error, please try again later!');
      });
  }
}
