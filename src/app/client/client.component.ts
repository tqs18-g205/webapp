import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services';
import { Reservation, Client, Order } from '../_models';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client: Client;
  reservations: Reservation[];
  orders: Order[];

  constructor(private service: DataService) { }

  ngOnInit() {
    const userId = localStorage.getItem('currentUser');
    this.service.getReservations(+userId)
      .subscribe(reservations => {
        this.reservations = reservations;
      });
    this.service.getOrders(+userId)
      .subscribe(orders => {
        this.orders = orders;
      });
    this.service.getClient(+userId)
      .subscribe(client => {
        this.client = client;
      });
  }

}
