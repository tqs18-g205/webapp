import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlateService, Plate, Category, Ingredient, IngredientQuantity } from './plate.service';

describe('PlateService', () => {
  let injector: TestBed;
  let service: PlateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlateService]
    });
    injector = getTestBed();
    service = injector.get(PlateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getPlates', () => {
    it('should return an Observable<Plate>', () => {

      service.getPlates().subscribe(plates => {
        expect(plates.length).toBe(2);
        expect(plates).toEqual(DUMMY_PLATES);
      });

      const req = httpMock.expectOne(`${service.api_url}/pratos`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_PLATES);
    });
  });

  describe('#getPlate', () => {
    it('should return an Observable<Plate>', () => {

      service.getPlate(0).subscribe(plate => {
        expect(plate).toEqual(DUMMY_PLATE_0);
      });

      const req = httpMock.expectOne(`${service.api_url}/pratos/0`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_PLATE_0);
    });
  });

  describe('#getPlateCategories', () => {
    it('should return an Observable<Category>', () => {

      service.getPlateCategories().subscribe(categories => {
        expect(categories).toEqual(DUMMY_PLATE_CATEGORIES);
      });

      const req = httpMock.expectOne(`${service.api_url}/categorias/pratos`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_PLATE_CATEGORIES);
    });
  });


  it('should be created', inject([PlateService], (sservice: PlateService) => {
    expect(sservice).toBeTruthy();
  }));

});

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


const DUMMY_PLATE_CATEGORIES = [
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
  }
];
