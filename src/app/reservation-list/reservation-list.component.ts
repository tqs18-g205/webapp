import { Component, OnInit } from '@angular/core';
import { DataService } from './../_services';
import { Restaurant, Reservation, Client } from './../_models';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[];

  constructor(private reservation_service: DataService) { }

  ngOnInit() {
    const userId = localStorage.getItem('currentUser');
    this.reservation_service.getReservations(+userId)
      .subscribe(reservations => {
        console.log(reservations);
        this.reservations = reservations;
      });
  }

}
