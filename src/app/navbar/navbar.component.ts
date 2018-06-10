import { Client, Plate, Cart } from './../_models';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services';
import { Router } from '@angular/router';

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

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    const client = this.dataService.getCurrentClient();
    if (client !== null) {
      client.subscribe(currUser => {
        this.client = currUser;
      });
    }

    const cart: Cart = this.dataService.getCurrentCart();
    for (const cartPlate of cart.plates) {
      this.dataService.getPlate(cartPlate.id).subscribe(
        plate => {
          this.itemsInCart += cartPlate.quantity;
        }
      );
    }
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/']);
  }

}
