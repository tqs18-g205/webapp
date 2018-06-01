import { environment } from './../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { PlateListComponent } from './plate-list.component';
import { PlateService, Plate, Category, Ingredient, IngredientQuantity } from '../plate.service';
import { stringify } from 'querystring';

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
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the plate list', () => {
    expect(component.plates).toBe(DUMMY_PLATES);
  });

  it('should set the plate details', () => {
    component.updateModal(0);
    expect(component.modal_plate).toBe(DUMMY_PLATE_0);
  });

  it('should update search term and the results', () => {
    spyOn(component, 'updateResults');
    component.updateTerm('Asian');
    expect(component.search.term).toBe('Asian');
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
    expect(stringify(component.search.categories)).toEqual(stringify([0, 1, 2, 3, 4, 5]));
    component.updateCategories(2);
    expect(stringify(component.search.categories)).toEqual(stringify([0, 1, 3, 4, 5]));
    component.updateCategories(2);
    expect(stringify(component.search.categories)).toEqual(stringify([0, 1, 3, 4, 5, 2]));
  });

  it('should update the results (show all)', () => {
    component.updateResults();
    expect(component.plates_to_show).toEqual(component.plates);
  });

  it('should update the results (show none)', () => {
    component.updateTerm('Prato inexistente');
    expect(component.plates_to_show).toEqual([]);
  });

  it('should update the results (dont show "Entrada"s)', () => {
    component.updateFilter();
    component.updateCategories(4);
    expect(component.plates_to_show.length).toEqual(component.plates.length - 2);
  });

  it('should update the results (show "Entrada"s only)', () => {
    component.updateFilter();
    for (const cat of [0, 1, 2, 3, 5] ) {
      component.updateCategories(cat);
    }
    expect(component.plates_to_show.length).toEqual(2);
  });

  it('should have no intersection between [0, 1, 2] and [3, 4, 5])', () => {
    component.intersect([0, 1, 2], [3, 4, 5]);
    expect(component.intersect([0, 1, 2], [3, 4, 5])).toBeFalsy();
  });

  it('should have some intersection between [0, 1, 2] and [2, 4, 5])', () => {
    component.intersect([0, 1, 2], [2, 4, 5]);
    expect(component.intersect([0, 1, 2], [2, 4, 5])).toBeTruthy();
  });

});

class PlateServiceMock {
  public getPlates(): Observable<Plate[]> {
    return Observable.of(DUMMY_PLATES);
  }

  public getPlate(plate_id: number): Observable<Plate> {
    return Observable.of(DUMMY_PLATE_0);
  }

  public getPlateCategories(plate_id: number): Observable<Category[]> {
    return Observable.of(DUMMY_CATEGORIES);
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
        ingredient: <Ingredient>{
          id: 0,
          name: 'Tofu',
          calories: 20
        },
        quantity: 500
    },
      <IngredientQuantity>{
        ingredient: <Ingredient>{
          id: 0,
          name: 'Onions',
          calories: 50
        },
        quantity: 200
    },
      <IngredientQuantity>{
        ingredient: <Ingredient>{
          id: 0,
          name: 'Soy Sauce',
          calories: 70
        },
        quantity: 30
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
    image: 'https://eatfirst.imgix.net/ce916f40-7ff7-4f27-add0-73160194028c.jpeg',
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
  },
  <Plate>{
    id: 2,
    name: 'GRILLED MISO CHICKEN',
    cost: 7.99,
    image: 'https://eatfirst.imgix.net/7832cd80-b221-4bd1-a28c-5e282508ef6e.jpeg',
    calories: 663,
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
  },
  <Plate>{
    id: 3,
    name: 'NAKED CHICKEN CAESAR',
    cost: 8.99,
    image: 'https://eatfirst.imgix.net/8d007ebb-6982-4f17-9a3e-a32362bb8fba.jpeg',
    calories: 377,
    categories: [
      <Category>{
        id: 0,
        name: 'Prato'
      },
      <Category>{
        id: 3,
        name: 'Carne'
      }]
  },
  <Plate>{
    id: 4,
    name: 'POTATO AND EGG SALAD',
    cost: 2.80,
    image: 'https://eatfirst.imgix.net/3293d155-546a-44ef-ba01-89b575f11054.jpeg',
    calories: 225,
    categories: [
      <Category>{
        id: 4,
        name: 'Entrada'
      }]
  },
  <Plate>{
    id: 5,
    name: 'EDAMAME WITH MALDON SALT',
    cost: 2.99,
    image: 'https://eatfirst.imgix.net/26ce83ee-9da2-4898-8bce-909a80c59a36.jpeg',
    calories: 73,
    categories: [
      <Category>{
        id: 4,
        name: 'Entrada'
      }]
  },
  <Plate>{
    id: 6,
    name: 'TIRAMISU',
    cost: 4.99,
    image: 'https://eatfirst.imgix.net/79f495cc-dd93-40ea-96cf-edfa0cdfce9d.jpeg',
    calories: 409,
    categories: [
      <Category>{
        id: 5,
        name: 'Sobremesa'
      }]
    }
  ];


const DUMMY_CATEGORIES = [
  <Category>{
    id: 0,
    name: 'Prato'
  },
  <Category>{
    id: 1,
    name: 'Japonês'
  },
  <Category>{
    id: 2,
    name: 'Asiático'
  },
  <Category>{
    id: 3,
    name: 'Carne'
  },
  <Category>{
    id: 4,
    name: 'Entrada'
  },
  <Category>{
    id: 5,
    name: 'Sobremesa'
  }];
