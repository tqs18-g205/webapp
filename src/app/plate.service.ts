import { Plate } from './plate.service';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface IngredientQuantity {
  ingredient: Ingredient;
  quantity: number;
}

export interface Ingredient {
  id: number;
  name: string;
  calories: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Plate {
  id: number;
  name: string;
  cost: number;
  image: string;
  calories: number;
  categories: Category[];
  ingredients: IngredientQuantity[];
}

export interface Category {
  id: number;
  name: string;
}

@NgModule()
@Injectable()
export class PlateService {
  readonly api_url = 'https://demo6336625.mockable.io/api';

  getPlates(): Observable<Plate[]> {
    return this.http.get<Plate[]>(this.api_url + '/pratos');
  }

  getPlate(id: number): Observable<Plate> {
    return this.http.get<Plate>(this.api_url + '/pratos/' + id);
  }

  constructor(private http: HttpClient) { }
}

