import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = 'GoNutri';
  pages = [
    { name: 'Pratos Surgeridos', link: 'plates' },
    { name: 'Todos os Pratos', link: 'plates' }];

  constructor() { }

  ngOnInit() {
  }

}
