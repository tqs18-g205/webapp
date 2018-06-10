import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from './';
import { DUMMY_PLATES, DUMMY_PLATE_CATEGORIES,
  DUMMY_RESTAURANTS, DUMMY_RESTAURANT_CATEGORIES, DUMMY_DELIVERIES,
  DUMMY_CLIENTS, DUMMY_FORBIDDEN, DUMMY_RESERVATIONS, DUMMY_ORDERS, DUMMY_CART } from './';
import { exec } from 'child_process';
import { first } from 'rxjs/operators';
import { stringify } from 'querystring';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    const injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentCart');
  });

  it('should be created', inject([DataService], (dservice: DataService) => {
    expect(dservice).toBeTruthy();
  }));

  describe('#getPlates', () => {
    it('should return an Observable<Plate>', () => {
      service.getPlates().subscribe(plates => {
        expect(plates.length).toBe(DUMMY_PLATES.length);
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
        expect(plate).toEqual(DUMMY_PLATES[0]);
      });

      const req = httpMock.expectOne(`${service.api_url}/pratos/0`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_PLATES[0]);
    });
  });

  describe('#getPlateCategories', () => {
    it('should return an Observable<Category>', () => {
      service.getPlateCategories().subscribe(categories => {
        expect(categories.length).toBe(DUMMY_PLATE_CATEGORIES.length);
        expect(categories).toEqual(DUMMY_PLATE_CATEGORIES);
      });

      const req = httpMock.expectOne(`${service.api_url}/categorias/pratos`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_PLATE_CATEGORIES);
    });
  });

  describe('#getRestaurants', () => {
    it('should return an Observable<Restaurant>', () => {
      service.getRestaurants().subscribe(restaurant => {
        expect(restaurant.length).toBe(DUMMY_RESTAURANTS.length);
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
        expect(restaurant).toEqual(DUMMY_RESTAURANTS[0]);
      });

      const req = httpMock.expectOne(`${service.api_url}/restaurantes/1`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_RESTAURANTS[0]);
    });
  });

  describe('#getRestaurantCategories', () => {
    it('should return an Observable<Category>', () => {
      service.getRestaurantCategories().subscribe(categories => {
        expect(categories.length).toBe(DUMMY_RESTAURANT_CATEGORIES.length);
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
        expect(deliveries.length).toBe(DUMMY_DELIVERIES.length);
        expect(deliveries).toEqual(DUMMY_DELIVERIES);
      });

      const req = httpMock.expectOne(`${service.api_url}/tiposentrega`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_DELIVERIES);
    });
  });

  describe('#addClient', () => {
    it('should return an Observable<Client>', () => {
      const client = DUMMY_CLIENTS[0];
      client.id = null;

      service.addClient(client).subscribe(createdClient => {
        expect(createdClient).toBe(DUMMY_CLIENTS[0]);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(client);
      req.flush(DUMMY_CLIENTS[0]);
    });
  });

  describe('#getClient', () => {
    it('should return FORBIDDEN (no login)', () => {
      service.getClient(0).subscribe(client => {
        expect(client).toBe(DUMMY_FORBIDDEN);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_FORBIDDEN);
    });

    it('should return Observable<Client>', () => {

      service.getClient(0).subscribe(client => {
        expect(client).toBe(DUMMY_CLIENTS[0]);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_CLIENTS[0]);
    });
  });

  describe('#getReservations', () => {
    it('should return FORBIDDEN (no login)', () => {
      service.getReservations(0).subscribe(reservations => {
        expect(reservations).toBe(DUMMY_FORBIDDEN);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0/reservas`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_FORBIDDEN);
    });

    it('should return Observable<Reservation>', () => {
      service.getReservations(0).subscribe(reservations => {
        expect(reservations).toBe(DUMMY_RESERVATIONS);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0/reservas`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_RESERVATIONS);
    });
  });

  describe('#getOrders', () => {
    it('should return FORBIDDEN (no login)', () => {
      service.getOrders(0).subscribe(orders => {
        expect(orders).toBe(DUMMY_FORBIDDEN);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0/encomendas`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_FORBIDDEN);
    });

    it('should return Observable<Client>', () => {
      service.getOrders(0).subscribe(orders => {
        expect(orders).toBe(DUMMY_ORDERS);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0/encomendas`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_ORDERS);
    });
  });

  describe('#addOrder', () => {
    it('should return the purchase (summary)', () => {
      service.setCurrentCart({ plates: [{ id: 1, quantity: 1 }, { id: 7, quantity: 1}]});
      service.addOrder().subscribe(order => {
        expect(order).toBe(DUMMY_ORDERS[0]);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0/encomendas`);
      expect(req.request.method).toBe('POST');
      expect(JSON.stringify(req.request.body)).toBe(
        JSON.stringify({ tipoEntrega: 1, cliente: 0, pratos: {1: 1, 7: 1} }));
      req.flush(DUMMY_ORDERS[0]);
    });
  });

  describe('#makeReservation', () => {
    it('should return the summary', () => {
      const reservation = { cliente: 0, restaurante: 2, data: '25-5-2018', hora: '20:50' };
      service.makeReservation(reservation).subscribe(reser => {
        expect(reser).toBe(DUMMY_RESERVATIONS[0]);
      });

      const req = httpMock.expectOne(`${service.api_url}/clientes/0/reservas`);
      expect(req.request.method).toBe('POST');
      expect(JSON.stringify(req.request.body)).toBe(
        JSON.stringify(reservation));
      req.flush(DUMMY_RESERVATIONS[0]);
    });
  });

  describe('#logIn', () => {
    afterEach(() => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentToken');
      localStorage.removeItem('currentCart');
    });

    it('should set currentUser and currentToken in localStorage', () => {
      service.login({ username: 'username', passwd: 'password' }).pipe(first())
        .subscribe(
          data => {
            expect(localStorage.getItem('currentUser')).toBe('0');
            expect(localStorage.getItem('currentToken')).toBe('Bearer XXX');
           },
          error => {
            throw new Error('Login should occur');
          });

      const req = httpMock.expectOne(`${service.host_url}/login`);
      expect(req.request.method).toBe('POST');
      expect(JSON.stringify(req.request.body)).toBe(
        JSON.stringify({ username: 'username', passwd: 'password' }));
      req.flush({cliente: 0, token: 'Bearer XXX'});
    });

    it('should return error', () => {
      service.login({ username: 'username', passwd: 'wrongpassword' }).pipe(first())
        .subscribe(
          data => { throw new Error('Login should not occur'); },
          error => {
            expect(localStorage.getItem('currentUser')).toBe(null);
            expect(localStorage.getItem('currentToken')).toBe(null);
           });

      const req = httpMock.expectOne(`${service.host_url}/login`);
      expect(req.request.method).toBe('POST');
      expect(JSON.stringify(req.request.body)).toBe(
        JSON.stringify({ username: 'username', passwd: 'wrongpassword' }));
      req.error(new ErrorEvent(''));
    });

    it('should return invalid', () => {
      service.login({ username: 'username', passwd: 'wrongpassword' }).pipe(first())
        .subscribe(
          data => {
            expect(localStorage.getItem('currentUser')).toBe(null);
            expect(localStorage.getItem('currentToken')).toBe(null);
          },
          error => {
            throw new Error('Error should not occur');
          });

      const req = httpMock.expectOne(`${service.host_url}/login`);
      expect(req.request.method).toBe('POST');
      expect(JSON.stringify(req.request.body)).toBe(
        JSON.stringify({ username: 'username', passwd: 'wrongpassword' }));
      req.flush({ cliente: 0 });
    });
  });

  describe('#loggedIn', () => {
    it('should check currentUser in localStorage', () => {
      localStorage.setItem('currentUser', '0');
      expect(service.loggedIn()).toBeTruthy();
    });

    it('should check currentUser in localStorage', () => {
      expect(service.loggedIn()).toBeFalsy();
    });
  });

  describe('#logout', () => {
    it('should remove currentUser from localStorage', () => {
      expect(localStorage.getItem('currentUser')).toBe(null);
      service.logout();
      expect(localStorage.getItem('currentUser')).toBe(null);
    });

    it('should remove currentUser from localStorage', () => {
      localStorage.setItem('currentUser', '0');
      expect(localStorage.getItem('currentUser')).toBe('0');
      service.logout();
      expect(localStorage.getItem('currentUser')).toBe(null);
    });
  });

  describe('#getCurrentClient', () => {
    it('should get a logged in client cart', () => {
      spyOn(service, 'getClient').and.callThrough();
      localStorage.setItem('currentUser', '0');

      service.getCurrentClient().subscribe(client => {
        expect(client).toBe(DUMMY_CLIENTS[0]);
      });
      expect(service.getClient).toHaveBeenCalledWith(0);

      const req = httpMock.expectOne(`${service.api_url}/clientes/0`);
      expect(req.request.method).toBe('GET');
      req.flush(DUMMY_CLIENTS[0]);
    });

    it('should get null (not logged in)', () => {
      expect(service.getCurrentClient()).toBe(null);
    });
  });

  describe('#setCurrentCart', () => {
    it('should set the cart to localStorage', () => {
      expect(localStorage.getItem('currentCart')).toBe(null);
      service.setCurrentCart(DUMMY_CART);
      expect(localStorage.getItem('currentCart')).toBe(JSON.stringify(DUMMY_CART));
    });
  });

  describe('#getCurrentCart', () => {
    it('should get the cart from localStorage', () => {
      service.setCurrentCart(DUMMY_CART);
      expect(stringify(service.getCurrentCart())).toBe(stringify(DUMMY_CART));
    });

    it('should get an empty cart', () => {
      expect(stringify(service.getCurrentCart())).toBe(stringify({plates: []}));
    });
  });

  describe('#getHeaders', () => {
    it('should return clean Headers', () => {
      const headers: HttpHeaders = service.getHeaders();
      expect(headers.keys().length).toBe(0);
    });

    it('should return valid Headers', () => {
      localStorage.setItem('currentToken', 'token');
      const headers: HttpHeaders = service.getHeaders();
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('Authorization')).toBe('token');
      expect(headers.keys().length).toBe(2);
    });
  });

});
