import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Plate {
  id: number;
  name: string;
  cost: number;
  image: string;
  calories: number;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}

@NgModule()
@Injectable()
export class PlateService {
  url: string;

  getPlates(): Observable<Plate[]> {
    return this.http.get<Plate[]>(this.url + '/pratos');
  }

  constructor(private http: HttpClient) {
    this.url = 'https://demo6336625.mockable.io/api';
  }
}
