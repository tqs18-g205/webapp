import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Plate, PlateCategory, Ingredient, IngredientQuantity,
  Restaurant, Delivery, Cooking, Client, Reservation, Order, Forbidden, Cart } from './../_models';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';


@NgModule()
@Injectable()
export class DataService {
  readonly host_url = 'https://tqsnutri.herokuapp.com';
  readonly api_url = this.host_url + '/api';

  // General API Endpoints
  getPlates(): Observable<Plate[]> {
    return this.http.get<Plate[]>(this.api_url + '/pratos');
  }

  getPlate(id: number): Observable<Plate> {
    return this.http.get<Plate>(this.api_url + '/pratos/' + id);
  }

  getPlateCategories(): Observable<PlateCategory[]> {
    return this.http.get<PlateCategory[]>(this.api_url + '/categorias/pratos');
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.api_url + '/restaurantes');
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.api_url + '/restaurantes/' + id);
  }

  getRestaurantCategories(): Observable<Cooking[]> {
    return this.http.get<Cooking[]>(this.api_url + '/tiposcozinha');
  }

  getRestaurantDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.api_url + '/tiposentrega');
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.api_url + '/clientes',
      client);
  }

  // Login Required API Endpoints
  getClient(id: number): Observable<any> {
    return this.http.get<Client>(this.api_url + '/clientes/' + id,
      { headers: this.getHeaders() });
  }

  getReservations(id: number): Observable<any> {
    return this.http.get<Reservation[]>(this.api_url + '/clientes/' + id + '/reservas',
      { headers: this.getHeaders() });
  }

  getOrders(id: number): Observable<any> {
    return this.http.get<Order[]>(this.api_url + '/clientes/' + id + '/encomendas',
      { headers: this.getHeaders() });
  }

  addOrder(): Observable<any> {
    const client_id: number = +localStorage.getItem('currentUser');
    const plates = new Map<number, number>();
    for (const plate of this.getCurrentCart().plates) {
      plates[plate.id] = plate.quantity;
    }
    return this.http.post(this.api_url + '/clientes/' + client_id + '/encomendas',
      { tipoEntrega: 1, cliente: client_id, pratos: plates },
      { headers: this.getHeaders() });
  }

  // Internal Login Management
  login(user: { username: string, passwd: string }): Observable<any> {
    return this.http.post<any>(this.host_url + '/login', user)
      .pipe(map(resp => {
        if (resp !== null && resp.token !== undefined) {
          localStorage.setItem('currentToken', resp.token);
          localStorage.setItem('currentUser', resp.cliente);
        }
        return resp;
      }));
  }

  loggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  logout() {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
  }

  getCurrentClient(): Observable<Client> {
    if (this.loggedIn()) {
      return this.getClient(+localStorage.getItem('currentUser'));
    }
    return null;
  }

  setCurrentCart(cart: Cart) {
    localStorage.setItem('currentCart', JSON.stringify(cart));
  }

  getCurrentCart(): Cart {
    if (localStorage.getItem('currentCart') === null) {
      this.setCurrentCart(<Cart>{plates: []});
    }
    const currCart = <Cart>JSON.parse(localStorage.getItem('currentCart'));
    return currCart;
  }

  getHeaders(): HttpHeaders {
    const currentToken = localStorage.getItem('currentToken');
    if (currentToken) {
      return new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', currentToken);
    }
    return new HttpHeaders();
  }

  constructor(private http: HttpClient) { }
}
