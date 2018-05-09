import { Component, OnInit } from '@angular/core';
import { PlateService, Plate } from './../plate.service';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];
  modal_plate: Plate;

  constructor(private plate_service: PlateService) {
    this.plate_service.getPlates()
      .subscribe(newplates => {
        this.plates = newplates;
        this.modal_plate = newplates[0];
        this.modal_plate.ingredients = [];
      });
  }

  updateModal(plate_id: number): void {
    this.plate_service.getPlate(plate_id)
      .subscribe(newplate => {
        this.modal_plate = newplate;
      });
      console.log(this.modal_plate);
    //this.modal_plate = this.sug_plates[indexOfPlate];
  }

  ngOnInit() {
  }

}
