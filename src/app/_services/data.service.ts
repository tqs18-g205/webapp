import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Plate, PlateCategory, Ingredient, IngredientQuantity,
  Restaurant, Delivery, Cooking, Client, Reservation, ReservationModel, Order } from './../_models';
import { map } from 'rxjs/operators';


@NgModule()
@Injectable()
export class DataService {
  readonly host_url = 'https://tqsnutri.herokuapp.com';
  readonly api_url = this.host_url + '/api';

  getReservations(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api_url + '/clientes/' + id + '/reservas',
      { headers: this.getHeaders() });
  }

  makeReservation(model: ReservationModel): Observable<any> {
    return this.http.post(this.api_url + '/clientes/' + model.cliente + '/reservas',
    model, { headers: this.getHeaders() });
  }
  
  getOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.api_url + '/clientes/' + id + '/encomendas',
      { headers: this.getHeaders() });
  }

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

  login(user: any) {
    return this.http.post<any>(this.host_url + '/login', user)
      .pipe(map(resp => {
        if (resp && resp.token) {
          localStorage.setItem('currentToken', resp.token);
          localStorage.setItem('currentUser', resp.cliente);
        }
        return resp;
      }));
  }

  loggedIn() {
    return !localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.api_url + '/clientes/' + id,
      { headers: this.getHeaders() });
  }

  addClient(client: Client) {
    return this.http.post(this.api_url + '/clientes', client);
  }

  getCurrentClient(): Observable<Client> {
    const userId = localStorage.getItem('currentUser');
    if (userId) {
      return this.getClient(+userId);
    }
    return;
  }

  getCurrentCart(): Map<number, number> {
    let cart = <Map<number, number>>JSON.parse(localStorage.getItem('currentCart'));
    if (!cart) {
      cart = new Map<number, number>();
    }
    return cart;
  }

  setCurrentCart(cart: Map<number, number>) {
    localStorage.setItem('currentCart', JSON.stringify(cart));
  }

  getHeaders() {
    const currentToken = localStorage.getItem('currentToken');
    if (currentToken) {
      return new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', currentToken);
    }
    return new HttpHeaders();
  }

  purchase() {
    const client_id: number = +localStorage.getItem('currentUser');
    return this.http.post(this.api_url + '/clientes/' + client_id + '/encomendas',
      { tipoEntrega: 1, cliente: client_id, pratos: this.getCurrentCart()},
      { headers: this.getHeaders() });
  }

  constructor(private http: HttpClient) { }
}
