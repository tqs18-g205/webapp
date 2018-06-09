import { environment } from './../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { RestaurantListComponent } from './restaurant-list.component';
import { DataService, UtilitiesService, DUMMY_RESTAURANTS, DataServiceMock } from './../_services';
import { Restaurant, Cooking, Delivery, Plate, PlateCategory, Address } from './../_models';
import { stringify } from 'querystring';

describe('PlateListComponent', () => {
  let component: RestaurantListComponent;
  let dataService: DataService;
  let fixture: ComponentFixture<RestaurantListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RestaurantListComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock },
        UtilitiesService
      ]
    });
    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the plate list', () => {
    expect(component.restaurants).toBe(DUMMY_RESTAURANTS);
  });

  it('should set the plate details', () => {
    component.updateModal(0);
    expect(component.modal_restaurant).toBe(DUMMY_RESTAURANTS[0]);
  });

  it('should update search term and the results', () => {
    spyOn(component, 'updateResults');
    component.updateTerm('Moliceiro');
    expect(component.search.term).toBe('Moliceiro');
    expect(component.updateResults).toHaveBeenCalled();
  });

  it('should update filter state and the results', () => {
    spyOn(component, 'updateResults');
    expect(component.search.on).toBeFalsy();
    component.updateFilter();
    expect(component.search.on).toBeTruthy();
    expect(component.updateResults).toHaveBeenCalled();
    component.updateFilter();
    expect(component.search.on).toBeFalsy();
    expect(component.updateResults).toHaveBeenCalled();
  });

  it('should update categories and the results', () => {
    spyOn(component, 'updateResults');
    expect(stringify(component.search.categories)).toEqual(stringify([1, 2, 3]));
    component.updateCategories(2);
    expect(component.updateResults).toHaveBeenCalled();
    expect(stringify(component.search.categories)).toEqual(stringify([1, 3]));
    component.updateCategories(2);
    expect(component.updateResults).toHaveBeenCalled();
    expect(stringify(component.search.categories)).toEqual(stringify([1, 3, 2]));
  });

  it('should update deliveries and the results', () => {
    spyOn(component, 'updateResults');
    expect(stringify(component.search.deliveries)).toEqual(stringify([1, 2]));
    component.updateDeliveries(1);
    expect(component.updateResults).toHaveBeenCalled();
    expect(stringify(component.search.deliveries)).toEqual(stringify([2]));
    component.updateDeliveries(1);
    expect(component.updateResults).toHaveBeenCalled();
    expect(stringify(component.search.deliveries)).toEqual(stringify([2, 1]));
  });

  it('should update the results (show all)', () => {
    component.updateResults();
    expect(component.restaurants_to_show).toEqual(component.restaurants);
  });

  it('should update the results (show none)', () => {
    component.updateTerm('Restaurante');
    expect(component.restaurants_to_show).toEqual([]);
  });

  it('should update the results (dont show "Portuguese" kitchen)', () => {
    expect(component.restaurants_to_show.length).toEqual(1);
    spyOn(component, 'updateCategories').and.callThrough();
    component.updateFilter();
    component.updateCategories(1);
    expect(component.updateCategories).toHaveBeenCalled();
    expect(component.restaurants_to_show.length).toEqual(0);
  });

  it('should update the results (dont show "Take Away" deliveries)', () => {
    expect(component.restaurants_to_show.length).toEqual(1);
    spyOn(component, 'updateDeliveries').and.callThrough();
    component.updateFilter();
    component.updateDeliveries(1);
    expect(component.updateDeliveries).toHaveBeenCalled();
    expect(component.restaurants_to_show.length).toEqual(0);
  });

  it('should complete the reservation', () => {
    dataService.login({ username: 'username', passwd: 'password'});
    spyOn(dataService, 'makeReservation').and.callThrough();
    component.makeReservation(0, '20:30:00');
    expect(dataService.makeReservation).toHaveBeenCalled();
    dataService.logout();
  });

});
