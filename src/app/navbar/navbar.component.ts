import { Client, Plate } from './../_models';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = 'GoNutri';
  pages = [
    { name: 'Todos os Pratos', link: 'plates' },
    { name: 'Todos os Restaurantes', link: 'restaurants' }];

  client: Client;
  itemsInCart = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const client = this.dataService.getCurrentClient();
    if (client) {
      client.subscribe(
        currUser => { this.client = currUser; }
      );
    }

    const cart: Map<number, number> = this.dataService.getCurrentCart();
    for (let i = 1; i < 20; i++) {
      if (cart[i]) {
        this.itemsInCart += cart[i];
      }
    }
  }

  logout() {
    this.dataService.logout();
    window.location.href = '/';
  }

}
