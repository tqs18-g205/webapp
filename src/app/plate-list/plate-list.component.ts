import { Component, OnInit } from '@angular/core';
import { DataService, UtilitiesService } from './../_services';
import { Plate, PlateCategory, Cart } from './../_models';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];
  modal_plate: Plate;

  plates_to_show: Plate[] = [];
  categories: PlateCategory[] = [];
  search = {
    term: '',
    on: false,
    categories: []
  };

  constructor(private plate_service: DataService, private utils: UtilitiesService) { }

  ngOnInit(): void {
    this.plate_service.getPlates()
      .subscribe(plates => {
        this.plates = plates;
        this.plates_to_show = plates;
      });
    this.plate_service.getPlateCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.search.categories = categories.map(({ id }) => id);
      });
  }

  updateModal(plate_id: number): void {
    this.plate_service.getPlate(plate_id)
      .subscribe(newplate => {
        this.modal_plate = newplate;
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

  updateResults(): void {
    this.plates_to_show = Array.of(...this.plates);
    if (this.search.term) {
      this.plates_to_show = this.plates_to_show.filter(
        plate => plate.nome.toLowerCase().includes(this.search.term.toLowerCase()));
    }

    if (this.search.on) {
      this.plates_to_show = this.plates_to_show.filter(
        plate => this.utils.intersect(
          this.search.categories,
          plate.categorias.map(({ id }) => id) ));
    }
  }

  addToCart(plate_id: number) {
    const cart: Cart = this.plate_service.getCurrentCart();
    for (const cartPlate of cart.plates) {
      if (cartPlate.id === plate_id) {
        cartPlate.quantity += 1;
        this.plate_service.setCurrentCart(cart);
        alert('Plate quantity updated.');
        return;
      }
    }

    cart.plates.push({id: plate_id, quantity: 1});
    this.plate_service.setCurrentCart(cart);
    alert('Plate added to the cart.');
  }

}
