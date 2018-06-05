import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataService, UtilitiesService } from './../_services';
import { ReservationListComponent } from './reservation-list.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Reservation, Restaurant } from '../_models';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let reservationService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationListComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock }
      ]
    });
    component = TestBed.createComponent(ReservationListComponent).componentInstance;
    reservationService = TestBed.get(DataService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class DataServiceMock {
  public getReservations(user_id: number): Observable<Reservation[]> {
    return Observable.of(null);
  }
}


