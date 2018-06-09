import { TestBed } from '@angular/core/testing';
import { DataService, DataServiceMock, DUMMY_CART, DUMMY_PLATES } from './../_services';
import { CartComponent } from './cart.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientComponent } from '../client/client.component';
import { stringify } from 'querystring';
import { Cart, Plate } from '../_models';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let service: DataService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartComponent,
        ClientComponent
      ],
      imports: [RouterTestingModule.withRoutes([{ path: 'client', component: ClientComponent },
      ])],
      providers: [
        { provide: DataService, useClass: DataServiceMock }
      ]
    });
    component = TestBed.createComponent(CartComponent).componentInstance;
    service = TestBed.get(DataService);
    router = TestBed.get(Router);
    component.ngOnInit();
  });

  beforeEach(() => {
    service.login({ username: 'username', passwd: 'password' });
  });

  afterEach(() => {
    service.logout();
    localStorage.removeItem('currentCart');
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#initial cart', () => {
    it('should be empty', () => {
      const mockCart = <Cart>{ plates: [] };
      service.setCurrentCart(mockCart);
      component.ngOnInit();
      expect(stringify(component.plateList)).toBe(stringify(mockCart));
      expect(component.total).toBe(0);
    });

    it('should be filled', () => {
      service.setCurrentCart(DUMMY_CART);
      spyOn(service, 'getCurrentCart').and.callThrough();
      spyOn(service, 'getPlate').and.returnValue(of(<Plate>{ nome: 'prato', preco: 1.5 }));
      component.ngOnInit();
      expect(service.getCurrentCart).toHaveBeenCalled();
      expect(service.getPlate).toHaveBeenCalledTimes(DUMMY_CART.plates.length);
      expect(stringify(component.plateList)).toBe(stringify(DUMMY_PLATES));
      expect(component.total).toBe(6);
    });
  });

  describe('#cancelCart', () => {
    it('should reset Cart', () => {
      spyOn(service, 'setCurrentCart').and.callThrough();
      component.cancelCart();
      const cart: Cart = <Cart>{plates: []};
      expect(service.setCurrentCart).toHaveBeenCalledWith(cart);
    });
  });

  describe('#confirmCart', () => {
    it('should complete the order', () => {
      spyOn(service, 'setCurrentCart').and.callThrough();
      spyOn(service, 'addOrder').and.callThrough();
      spyOn(router, 'navigate');
      spyOn(window, 'alert');
      component.confirmCart();
      expect(service.addOrder).toHaveBeenCalled();

      const cart: Cart = <Cart>{ plates: [] };
      expect(service.setCurrentCart).toHaveBeenCalledWith(cart);
      expect(router.navigate).toHaveBeenCalledWith(['/client']);
      expect(alert).toHaveBeenCalledWith('Purchase completed!');
    });

    it('should warn user about error', () => {
      service.logout();
      spyOn(service, 'addOrder').and.callThrough();
      spyOn(window, 'alert');
      component.confirmCart();
      expect(service.addOrder).toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('Error, try again later!');
    });
  });

  describe('#getQuantity', () => {
    it('should return undefined', () => {
      service.setCurrentCart({plates: []});
      component.ngOnInit();
      expect(component.getQuantity(0)).toBeUndefined();
    });

    it('should return undefined', () => {
      service.setCurrentCart({ plates: [{ id: 0, quantity: 10 }] });
      component.ngOnInit();
      expect(component.getQuantity(1)).toBeUndefined();
    });

    it('should return the correct quantity', () => {
      service.setCurrentCart({ plates: [{ id: 0, quantity: 10 }] });
      component.ngOnInit();
      expect(component.getQuantity(0)).toBe(10);
    });
  });
});
