import { Component, OnInit } from '@angular/core';
import { DataService, Restaurant, Category, Delivery } from './../data.service';
import { UtilitiesService } from './../utilities.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  modal_restaurant: Restaurant;

  restaurants_to_show: Restaurant[] = [];
  categories: Category[] = [];
  deliveries: Delivery[] = [];
  search = {
    term: '',
    on: false,
    categories: [],
    deliveries: []
  };

  constructor(private restaurant_service: DataService, private utils: UtilitiesService) { }

  ngOnInit(): void {
    this.restaurant_service.getRestaurants()
      .subscribe(restaurants => {
        restaurants.forEach(function addImage(rest: Restaurant) {
          rest.imagem = 'https://cdn3.igogo.pt/fotos/10/56/restaurante-o-moliceiro-3-1.jpg';
          rest.tiposEntrega = [<Delivery>{ id: 1, descricao: 'Take Away' }];
        });
        this.restaurants = restaurants;
        this.restaurants_to_show = restaurants;
      });
    this.restaurant_service.getRestaurantCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.search.categories = categories.map(({ id }) => id);
      });
    this.restaurant_service.getRestaurantDeliveries()
      .subscribe(deliveries => {
        this.deliveries = deliveries;
        this.search.deliveries = deliveries.map(({ id }) => id);
      });
  }

  updateModal(restaurant_id: number): void {
    this.restaurant_service.getRestaurant(restaurant_id)
      .subscribe(newrestaurant => {
        newrestaurant.imagem = 'https://cdn3.igogo.pt/fotos/10/56/restaurante-o-moliceiro-3-1.jpg';
        newrestaurant.tiposEntrega = [<Delivery>{id: 1, descricao: 'Take Away'}];
        newrestaurant.moradas = ['Rua da qui', 'Rua de tras'];
        this.modal_restaurant = newrestaurant;
      });
  }

  updateTerm(term: string) {
    this.search.term = term;
    this.updateResults();
  }

  updateFilter() {
    this.search.on = !this.search.on;
    this.updateResults();
  }

  updateCategories(category: number) {
    if (this.search.categories.includes(category)) {
      this.search.categories.splice(this.search.categories.indexOf(category), 1);
    } else {
      this.search.categories.push(category);
    }
    this.updateResults();
  }

  updateDeliveries(delivery: number) {
    if (this.search.deliveries.includes(delivery)) {
      this.search.deliveries.splice(this.search.deliveries.indexOf(delivery), 1);
    } else {
      this.search.deliveries.push(delivery);
    }
    this.updateResults();
  }

  updateResults() {
    this.restaurants_to_show = Array.of(...this.restaurants);
    if (this.search.term) {
      this.restaurants_to_show = this.restaurants_to_show.filter(
        restaurant => restaurant.nome.toLowerCase().includes(this.search.term.toLowerCase()));
    }
    if (this.search.on) {
      this.restaurants_to_show = this.restaurants_to_show.filter(
        restaurant => this.search.categories.includes(restaurant.tipoCozinha.id)
      );

      this.restaurants_to_show = this.restaurants_to_show.filter(
        restaurant => this.utils.intersect(
          this.search.deliveries,
          restaurant.tiposEntrega.map(({ id }) => id))
        );
    }
  }

}
