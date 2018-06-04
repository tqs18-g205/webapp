import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface IngredientQuantity {
  ingrediente: Ingredient;
  quantidade: number;
}

export interface Ingredient {
  id: number;
  nome: string;
  calorias: number;
}

export interface Category {
  id: number;
  nome: string;
}

export interface Plate {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  calorias: number;
  categorias: Category[];
  ingredientes: IngredientQuantity[];
}

export interface Delivery {
  id: number;
  descricao: string;
}

export interface Restaurant {
  id: number;
  nome: string;
  imagem: string;
  pratos: Plate[];
  tipoCozinha: Category;
  tiposEntrega: Delivery[];
  moradas: string[];
}


@NgModule()
@Injectable()
export class DataService {
  readonly api_url = 'https://tqsnutri.herokuapp.com/api';

  getPlates(): Observable<Plate[]> {
    return this.http.get<Plate[]>(this.api_url + '/pratos');
  }

  getPlate(id: number): Observable<Plate> {
    return this.http.get<Plate>(this.api_url + '/pratos/' + id);
  }

  getPlateCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api_url + '/categorias/pratos');
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.api_url + '/restaurantes');
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.api_url + '/restaurantes/' + id);
  }

  getRestaurantCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api_url + '/tiposcozinha');
  }

  getRestaurantDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.api_url + '/tiposentrega');
  }

  constructor(private http: HttpClient) { }
}

