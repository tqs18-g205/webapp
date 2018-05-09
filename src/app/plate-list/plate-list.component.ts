import { Component, OnInit } from '@angular/core';
import { PlateService, Plate } from './../plate.service';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.css']
})
export class PlateListComponent implements OnInit {

  plates: Plate[] = [];

  constructor(private plate_service: PlateService) {
    this.plate_service.getPlates()
      .subscribe(newplates => {
        this.plates = newplates;
      });
  }

  ngOnInit() {
  }

}
