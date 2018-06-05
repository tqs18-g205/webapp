import { Component, OnInit } from '@angular/core';
import { Plate } from '../_models';
import { DataService } from '../_services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Map<number, number> = new Map;
  plateList: Plate[];
  total: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.cart = this.dataService.getCurrentCart();
    this.plateList = [];
    this.total = 0;

    for (let i = 1; i < 20; i++) {
      if (this.cart[i]) {
        this.dataService.getPlate(i).subscribe(
          plate => {
            this.plateList.push(plate);
            this.total += plate.preco * this.cart[i];
          }
        );
      }
    }
  }

  cancelCart() {
    const cart: Map<number, number> = new Map();
    this.dataService.setCurrentCart(cart);
  }

  confirmCart() {
    this.dataService.purchase()
      .subscribe(
        data => {
          const cart: Map<number, number> = new Map();
          this.dataService.setCurrentCart(cart);
          alert('Purchase completed!');
          window.location.href = '/client';
        },
        error => {
          alert('Error, try again later!');
        });
  }

}
