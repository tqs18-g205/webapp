import { environment } from './../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { PlateListComponent } from './plate-list.component';
import { DataService, UtilitiesService } from './../_services';
import { Plate, PlateCategory, Ingredient, IngredientQuantity } from './../_models';
import { stringify } from 'querystring';

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let plateService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlateListComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock },
        UtilitiesService
      ]
    });
    component = TestBed.createComponent(PlateListComponent).componentInstance;
    plateService = TestBed.get(DataService);
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

});

class DataServiceMock {
  public getPlates(): Observable<Plate[]> {
    return Observable.of(DUMMY_PLATES);
  }

  public getPlate(plate_id: number): Observable<Plate> {
    return Observable.of(DUMMY_PLATE_0);
  }

  public getPlateCategories(plate_id: number): Observable<PlateCategory[]> {
    return Observable.of(DUMMY_CATEGORIES);
  }

  getCurrentCart() {
    return new Map<number, number>();
  }

  setCurrentCart() { }
}

const DUMMY_PLATE_0 =
  <Plate>{
    id: 0,
    nome: 'TOFU KATSU CURRY',
    preco: 5.99,
    imagem: 'https://eatfirst.imgix.net/b7451490-9964-43cd-90be-751349dd7b7f.jpeg',
    calorias: 764,
    categorias: [
      <PlateCategory>{
        id: 0,
        nome: 'Prato'
      },
      <PlateCategory>{
        id: 1,
        nome: 'Japonês'
      }],
    ingredientes: [
      <IngredientQuantity>{
        ingrediente: <Ingredient>{
          id: 0,
          nome: 'Tofu',
          calorias: 20
        },
        quantidade: 500
    },
      <IngredientQuantity>{
        ingrediente: <Ingredient>{
          id: 0,
          nome: 'Onions',
          calorias: 50
        },
        quantidade: 200
    },
      <IngredientQuantity>{
        ingrediente: <Ingredient>{
          id: 0,
          nome: 'Soy Sauce',
          calorias: 70
        },
        quantidade: 30
    }
    ]
  };

const DUMMY_PLATES = [
  <Plate>{
    id: 0,
    nome: 'TOFU KATSU CURRY',
    preco: 5.99,
    imagem: 'https://eatfirst.imgix.net/b7451490-9964-43cd-90be-751349dd7b7f.jpeg',
    calorias: 764,
    categorias: [
      <PlateCategory>{
        id: 0,
        nome: 'Prato'
      },
      <PlateCategory>{
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
      <PlateCategory>{
        id: 0,
        nome: 'Prato'
      },
      <PlateCategory>{
        id: 2,
        nome: 'Asiático'
      },
      <PlateCategory>{
        id: 3,
        nome: 'Carne'
      }]
  },
  <Plate>{
    id: 2,
    nome: 'GRILLED MISO CHICKEN',
    preco: 7.99,
    imagem: 'https://eatfirst.imgix.net/7832cd80-b221-4bd1-a28c-5e282508ef6e.jpeg',
    calorias: 663,
    categorias: [
      <PlateCategory>{
        id: 0,
        nome: 'Prato'
      },
      <PlateCategory>{
        id: 2,
        nome: 'Asiático'
      },
      <PlateCategory>{
        id: 3,
        nome: 'Carne'
      }]
  },
  <Plate>{
    id: 3,
    nome: 'NAKED CHICKEN CAESAR',
    preco: 8.99,
    imagem: 'https://eatfirst.imgix.net/8d007ebb-6982-4f17-9a3e-a32362bb8fba.jpeg',
    calorias: 377,
    categorias: [
      <PlateCategory>{
        id: 0,
        nome: 'Prato'
      },
      <PlateCategory>{
        id: 3,
        nome: 'Carne'
      }]
  },
  <Plate>{
    id: 4,
    nome: 'POTATO AND EGG SALAD',
    preco: 2.80,
    imagem: 'https://eatfirst.imgix.net/3293d155-546a-44ef-ba01-89b575f11054.jpeg',
    calorias: 225,
    categorias: [
      <PlateCategory>{
        id: 4,
        nome: 'Entrada'
      }]
  },
  <Plate>{
    id: 5,
    nome: 'EDAMAME WITH MALDON SALT',
    preco: 2.99,
    imagem: 'https://eatfirst.imgix.net/26ce83ee-9da2-4898-8bce-909a80c59a36.jpeg',
    calorias: 73,
    categorias: [
      <PlateCategory>{
        id: 4,
        nome: 'Entrada'
      }]
  },
  <Plate>{
    id: 6,
    nome: 'TIRAMISU',
    preco: 4.99,
    imagem: 'https://eatfirst.imgix.net/79f495cc-dd93-40ea-96cf-edfa0cdfce9d.jpeg',
    calorias: 409,
    categorias: [
      <PlateCategory>{
        id: 5,
        nome: 'Sobremesa'
      }]
    }
  ];


const DUMMY_CATEGORIES = [
  <PlateCategory>{
    id: 0,
    nome: 'Prato'
  },
  <PlateCategory>{
    id: 1,
    nome: 'Japonês'
  },
  <PlateCategory>{
    id: 2,
    nome: 'Asiático'
  },
  <PlateCategory>{
    id: 3,
    nome: 'Carne'
  },
  <PlateCategory>{
    id: 4,
    nome: 'Entrada'
  },
  <PlateCategory>{
    id: 5,
    nome: 'Sobremesa'
  }];
