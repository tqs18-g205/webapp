import { Component, OnInit } from '@angular/core';
import { Plate, Cart } from '../_models';
import { DataService } from '../_services';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  plateList: Plate[];
  total: number;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.cart = this.dataService.getCurrentCart();
    this.plateList = [];
    this.total = 0;

    for (const cartPlate of this.cart.plates) {
      this.dataService.getPlate(cartPlate.id).subscribe(
        plate => {
          this.plateList.push(plate);
          this.total += plate.preco * cartPlate.quantity;
        }
      );
    }
  }

  getQuantity(plate_id) {
    for (const cartPlate of this.cart.plates) {
      if (cartPlate.id === plate_id) {
        return cartPlate.quantity;
      }
    }
  }

  cancelCart() {
    this.dataService.setCurrentCart(<Cart>{ plates: [] });
  }

  confirmCart() {
    this.dataService.addOrder()
      .subscribe(
        data => {
          this.cancelCart();
          alert('Purchase completed!');
          this.router.navigate(['/client']);
        },
        error => {
          alert('Error, try again later!');
        });
  }

}
