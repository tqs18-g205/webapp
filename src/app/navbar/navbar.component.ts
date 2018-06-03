import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = 'GoNutri';
  pages = [
    { name: 'Todos os Pratos', link: 'plates' },
    { name: 'Todos os Restaurantes', link: 'restaurants' }];

  constructor() { }

  ngOnInit() {
  }

}
