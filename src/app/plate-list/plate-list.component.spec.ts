import { environment } from './../../environments/environment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { PlateListComponent } from './plate-list.component';
import { DataService, UtilitiesService, DataServiceMock, DUMMY_PLATES } from './../_services';
import { Plate, PlateCategory, Ingredient, IngredientQuantity } from './../_models';
import { stringify } from 'querystring';

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let plateService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlateListComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock },
        UtilitiesService
      ]
    });
    component = TestBed.createComponent(PlateListComponent).componentInstance;
    plateService = TestBed.get(DataService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the plate list', () => {
    expect(component.plates).toBe(DUMMY_PLATES);
  });

  it('should set the plate details', () => {
    component.updateModal(0);
    expect(component.modal_plate).toBe(DUMMY_PLATES[0]);
  });

  it('should update search term and the results', () => {
    spyOn(component, 'updateResults');
    component.updateTerm('Asian');
    expect(component.search.term).toBe('Asian');
    expect(component.updateResults).toHaveBeenCalled();
  });

  it('should update filter state and the results', () => {
    spyOn(component, 'updateResults');
    expect(component.search.on).toBeFalsy();
    component.updateFilter();
    expect(component.search.on).toBeTruthy();
    expect(component.updateResults).toHaveBeenCalled();
    component.updateFilter();
    expect(component.search.on).toBeFalsy();
    expect(component.updateResults).toHaveBeenCalled();
  });

  it('should update categories and the results', () => {
    expect(stringify(component.search.categories)).toEqual(stringify([0, 1, 2, 3, 4, 5]));
    component.updateCategories(2);
    expect(stringify(component.search.categories)).toEqual(stringify([0, 1, 3, 4, 5]));
    component.updateCategories(2);
    expect(stringify(component.search.categories)).toEqual(stringify([0, 1, 3, 4, 5, 2]));
  });

  it('should update the results (show all)', () => {
    component.updateResults();
    expect(component.plates_to_show).toEqual(component.plates);
  });

  it('should update the results (show none)', () => {
    component.updateTerm('Prato inexistente');
    expect(component.plates_to_show).toEqual([]);
  });

  it('should update the results (dont show "Carnes"s)', () => {
    component.updateFilter();
    component.updateCategories(3);
    expect(component.plates_to_show.length).toEqual(2);
  });

  it('should update the results (show "Carnes"s only)', () => {
    component.updateFilter();
    for (const cat of [0, 1, 2, 4, 5] ) {
      component.updateCategories(cat);
    }
    expect(component.plates_to_show.length).toEqual(1);
  });

  it('should add plate to the cart', () => {
    plateService.setCurrentCart({plates: []});
    spyOn(plateService, 'setCurrentCart').and.callThrough();
    spyOn(window, 'alert');
    component.addToCart(1);

    expect(plateService.setCurrentCart).toHaveBeenCalledWith({plates: [{id: 1, quantity: 1}]});
    expect(window.alert).toHaveBeenCalledWith('Plate added to the cart.');
  });

  it('should update plate quantity in cart', () => {
    plateService.setCurrentCart({ plates: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }] });
    spyOn(plateService, 'setCurrentCart').and.callThrough();
    spyOn(window, 'alert');
    component.addToCart(2);

    expect(plateService.setCurrentCart).toHaveBeenCalledWith({ plates: [{ id: 1, quantity: 1 }, { id: 2, quantity: 2 }] });
    expect(window.alert).toHaveBeenCalledWith('Plate quantity updated.');
  });

});
