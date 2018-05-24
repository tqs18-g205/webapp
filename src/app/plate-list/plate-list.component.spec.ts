import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { PlateListComponent } from './plate-list.component';
import { PlateService, Plate, Category, Ingredient, IngredientQuantity } from '../plate.service';

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let plateService: PlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlateListComponent
      ],
      providers: [
        { provide: PlateService, useClass: PlateServiceMock }
      ]
    });
    component = TestBed.createComponent(PlateListComponent).componentInstance;
    plateService = TestBed.get(PlateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the plate list', () => {
    component.ngOnInit();
    expect(component.plates).toBe(DUMMY_PLATES);
  });

  it('should set the plate details', () => {
    component.updateModal(0);
    expect(component.modal_plate).toBe(DUMMY_PLATE_0);
  });

});

class PlateServiceMock {
  public getPlates(): Observable<Plate[]> {
    return Observable.of(DUMMY_PLATES);
  }

  public getPlate(plate_id: number): Observable<Plate> {
    return Observable.of(DUMMY_PLATE_0);
  }
}

const DUMMY_PLATE_0 =
  <Plate>{
    id: 0,
    name: 'TOFU KATSU CURRY',
    cost: 5.99,
    image: 'https://eatfirst.imgix.net/b7451490-9964-43cd-90be-751349dd7b7f.jpeg',
    calories: 764,
    categories: [
      <Category>{
        id: 0,
        name: 'Prato'
      },
      <Category>{
        id: 1,
        name: 'Japonês'
      }],
    ingredients: [
      <IngredientQuantity>{
        quantity: 500,
        ingredient:
          <Ingredient>{
            id: 1,
            name: 'Tofu',
            calories: 20
          }
      },
      <IngredientQuantity>{
        quantity: 200,
        ingredient:
          <Ingredient>{
            id: 2,
            name: 'Onions',
            calories: 50
          }
      },
      <IngredientQuantity>{
        quantity: 30,
        ingredient:
          <Ingredient>{
            id: 3,
            name: 'Soy Sauce',
            calories: 70
          }
      }
    ]
  };

const DUMMY_PLATES = [
  <Plate>{
    id: 0,
    name: 'TOFU KATSU CURRY',
    cost: 5.99,
    image: 'https://eatfirst.imgix.net/b7451490-9964-43cd-90be-751349dd7b7f.jpeg',
    calories: 764,
    categories: [
      <Category>{
        id: 0,
        name: 'Prato'
      },
      <Category>{
        id: 1,
        name: 'Japonês'
      }]
  },
  <Plate>{
    id: 1,
    name: 'ASIAN BBQ RIBS',
    cost: 7.99,
    image: 'https://eatfirst.imgix.net/ce916f40-7ff7-4f27-add0-73160194028c.jpeg?',
    calories: 647,
    categories: [
      <Category>{
        id: 0,
        name: 'Prato'
      },
      <Category>{
        id: 2,
        name: 'Asiático'
      },
      <Category>{
        id: 3,
        name: 'Carne'
      }]
  }
];
