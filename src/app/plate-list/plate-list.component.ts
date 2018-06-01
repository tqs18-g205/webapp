import { Component, OnInit } from '@angular/core';
import { PlateService, Plate, Category } from './../plate.service';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];
  modal_plate: Plate;

  plates_to_show: Plate[] = [];
  categories: Category[] = [];
  search = {
    term: '',
    on: false,
    categories: []
  };

  constructor(private plate_service: PlateService) { }

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
        plate => plate.name.toLowerCase().includes(this.search.term.toLowerCase()));
    }

    if (this.search.on) {
      this.plates_to_show = this.plates_to_show.filter(
        plate => this.intersect(
          this.search.categories,
          plate.categories.map(({ id }) => id) ));
    }
  }

  intersect(array1: any[], array2: any[]): boolean {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (JSON.stringify(array1[i]) === JSON.stringify(array2[j])) {
          return true;
        }
      }
    }
    return false;
  }


}
