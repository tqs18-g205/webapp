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
  cart: Map<Plate, number> = new Map;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCurrentClient().subscribe(
      currUser => { this.client = currUser; }
      );
    this.cart = this.dataService.getCurrentCart();
  }

  logout() {
    this.dataService.logout();
    window.location.href = '/';
  }

}
