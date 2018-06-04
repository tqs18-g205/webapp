import { UtilitiesService } from './../utilities.service';
import { environment } from './../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { RestaurantListComponent } from './restaurant-list.component';
import { DataService, Restaurant, Category, Delivery, Plate } from '../data.service';
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
    expect(component.modal_restaurant).toBe(DUMMY_RESTAURANT_0);
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

  it('should update the results (show "Portuguese" kitchen only)', () => {
    expect(component.restaurants_to_show.length).toEqual(3);
    spyOn(component, 'updateCategories').and.callThrough();
    component.updateFilter();
    component.updateCategories(2);
    component.updateCategories(3);
    expect(component.updateCategories).toHaveBeenCalledTimes(2);
    expect(component.restaurants_to_show.length).toEqual(1);
  });

  it('should update the results (show "Take Away" deliveries only)', () => {
    expect(component.restaurants_to_show.length).toEqual(3);
    spyOn(component, 'updateDeliveries').and.callThrough();
    component.updateFilter();
    component.updateDeliveries(2);
    expect(component.updateDeliveries).toHaveBeenCalled();
    expect(component.restaurants_to_show.length).toEqual(2);
  });

});

class DataServiceMock {
  getRestaurants(): Observable<Restaurant[]> {
    return Observable.of(DUMMY_RESTAURANTS);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return Observable.of(DUMMY_RESTAURANT_0);
  }

  getRestaurantCategories(): Observable<Category[]> {
    return Observable.of(DUMMY_RESTAURANT_CATEGORIES);
  }

  getRestaurantDeliveries(): Observable<Delivery[]> {
    return Observable.of(DUMMY_DELIVERIES);
  }
}

const DUMMY_PLATES = [
  <Plate>{
    id: 0,
    nome: 'TOFU KATSU CURRY',
    preco: 5.99,
    imagem: 'https://eatfirst.imgix.net/b7451490-9964-43cd-90be-751349dd7b7f.jpeg',
    calorias: 764,
    categorias: [
      <Category>{
        id: 0,
        nome: 'Prato'
      },
      <Category>{
        id: 1,
        nome: 'Japonês'
      }]
  },
  <Plate>{
    id: 1,
    nome: 'ASIAN BBQ RIBS',
    preco: 7.99,
    imagem: 'https://eatfirst.imgix.net/ce916f40-7ff7-4f27-add0-73160194028c.jpeg',
    calorias: 647,
    categorias: [
      <Category>{
        id: 0,
        nome: 'Prato'
      },
      <Category>{
        id: 2,
        nome: 'Asiático'
      },
      <Category>{
        id: 3,
        nome: 'Carne'
      }]
  }
];


const DUMMY_DELIVERIES = [
  <Delivery>{
    id: 1,
    descricao: 'Take away'
  },
  <Delivery>{
    id: 2,
    descricao: 'Entrega em Casa'
  }
];


const DUMMY_RESTAURANT_CATEGORIES = [
  <Category>{
    id: 1,
    nome: 'Portuguesa'
  },
  <Category>{
    id: 2,
    nome: 'Indiana'
  },
  <Category>{
    id: 3,
    nome: 'Chinesa'
  }

];


const DUMMY_RESTAURANTS = [
  <Restaurant>{
    id: 1,
    nome: 'O Moliceiro',
    tipoCozinha:
      <Category>{
        id: 1,
        nome: 'Portuguesa'
      },
    tiposEntrega: [
      <Delivery>{
        id: 1,
        descricao: 'Take away'
      },
      <Delivery>{
        id: 2,
        descricao: 'Entrega em Casa'
      }
    ]
  },
  <Restaurant>{
    id: 2,
    nome: 'Monhe',
    tipoCozinha:
      <Category>{
        id: 2,
        nome: 'Indiana'
      },
    tiposEntrega: [
      <Delivery>{
        id: 1,
        descricao: 'Take away'
      }
    ]
  },
  <Restaurant>{
    id: 3,
    nome: 'Chinzeng',
    tipoCozinha:
      <Category>{
        id: 3,
        nome: 'Chinesa'
      },
    tiposEntrega: [
      <Delivery>{
        id: 2,
        descricao: 'Entrega em Casa'
      }
    ]
  }
];

const DUMMY_RESTAURANT_0 =
  <Restaurant>{
    id: 1,
    nome: 'O Moliceiro',
    pratos:
      DUMMY_PLATES,
    tipoCozinha:
      <Category>{
        id: 1,
        nome: 'Portuguesa'
      },
    tiposEntrega: [
      <Delivery>{
        id: 1,
        descricao: 'Take away'
      },
      <Delivery>{
        id: 2,
        descricao: 'Entrega em Casa'
      }
    ],
    moradas: [
      'Rua Principal nº25, Aveiro',
      'Rua da Avenida nº3, Coimbra']
  };
