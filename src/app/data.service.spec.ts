import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService, Plate, Category, Ingredient, IngredientQuantity, Restaurant, Delivery } from './data.service';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    injector = getTestBed();
    service = injector.get(DataService);
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

      service.getPlateCategories().subscribe(categorias => {
        expect(categorias).toEqual(DUMMY_PLATE_CATEGORIES);
      });

      const req = httpMock.expectOne(`${service.api_url}/categorias/pratos`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_PLATE_CATEGORIES);
    });
  });

  describe('#getRestaurants', () => {
    it('should return an Observable<Restaurant>', () => {

      service.getRestaurants().subscribe(restaurant => {
        expect(restaurant.length).toBe(1);
        expect(restaurant).toEqual(DUMMY_RESTAURANTS);
      });

      const req = httpMock.expectOne(`${service.api_url}/restaurantes`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_RESTAURANTS);
    });
  });

  describe('#getRestaurant', () => {
    it('should return an Observable<Restaurant>', () => {

      service.getRestaurant(1).subscribe(restaurant => {
        expect(restaurant).toEqual(DUMMY_RESTAURANT_0);
      });

      const req = httpMock.expectOne(`${service.api_url}/restaurantes/1`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_RESTAURANT_0);
    });
  });

  describe('#getRestaurantCategories', () => {
    it('should return an Observable<Category>', () => {

      service.getRestaurantCategories().subscribe(categories => {
        expect(categories).toEqual(DUMMY_RESTAURANT_CATEGORIES);
      });

      const req = httpMock.expectOne(`${service.api_url}/tiposcozinha`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_RESTAURANT_CATEGORIES);
    });
  });

  describe('#getRestaurantDeliveries', () => {
    it('should return an Observable<Delivery>', () => {

      service.getRestaurantDeliveries().subscribe(deliveries => {
        expect(deliveries).toEqual(DUMMY_DELIVERIES);
      });

      const req = httpMock.expectOne(`${service.api_url}/tiposentrega`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_DELIVERIES);
    });
  });


  it('should be created', inject([DataService], (sservice: DataService) => {
    expect(sservice).toBeTruthy();
  }));

});

const DUMMY_PLATE_0 =
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
      }],
    ingredientes: [
      <IngredientQuantity>{
        quantidade: 500,
        ingrediente:
          <Ingredient>{
            id: 1,
            nome: 'Tofu',
            calorias: 20
          }
      },
      <IngredientQuantity>{
        quantidade: 200,
        ingrediente:
          <Ingredient>{
            id: 2,
            nome: 'Onions',
            calorias: 50
          }
      },
      <IngredientQuantity>{
        quantidade: 30,
        ingrediente:
          <Ingredient>{
            id: 3,
            nome: 'Soy Sauce',
            calorias: 70
          }
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


const DUMMY_PLATE_CATEGORIES = [
  <Category>{
    id: 0,
    nome: 'Prato'
  },
  <Category>{
    id: 1,
    nome: 'Japonês'
  },
  <Category>{
    id: 2,
    nome: 'Asiático'
  },
  <Category>{
    id: 3,
    nome: 'Carne'
  },
  <Category>{
    id: 4,
    nome: 'Entrada'
  },
  <Category>{
    id: 5,
    nome: 'Sobremesa'
  }
];


const DUMMY_DELIVERIES = [
  <Delivery>{
    id: 1,
    descricao: 'Take away'
  }
];


const DUMMY_RESTAURANT_CATEGORIES = [
  <Category>{
    id: 1,
    nome: 'Portuguesa'
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
    tiposEntrega: [],
    moradas: []
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
    tiposEntrega: [],
    moradas: []
  };
