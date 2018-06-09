import { LoginComponent } from './../login/login.component';
import { TestBed } from '@angular/core/testing';
import { DataService, DataServiceMock, DUMMY_CLIENTS } from './../_services';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let service: DataService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        LoginComponent
      ],
      imports: [RouterTestingModule.withRoutes([{ path: '', component: LoginComponent }
        ])],
      providers: [
        { provide: DataService, useClass: DataServiceMock }
      ]
    });
    component = TestBed.createComponent(NavbarComponent).componentInstance;
    service = TestBed.get(DataService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngonInit', () => {
    it('should set client if logged in', () => {
      spyOn(service, 'getCurrentClient').and.callThrough();
      service.login({ username: 'username', passwd: 'password' });
      component.ngOnInit();

      expect(component.client).toBe(DUMMY_CLIENTS[0]);
      expect(service.getCurrentClient).toHaveBeenCalled();
      service.logout();
    });

    it('should set client if logged in', () => {
      service.setCurrentCart({plates: [{ id: 0, quantity: 2 }, { id: 1, quantity: 2 }]});
      spyOn(service, 'getPlate').and.callThrough();
      service.login({ username: 'username', passwd: 'password' });
      component.ngOnInit();

      expect(component.itemsInCart).toBe(4);
      expect(service.getPlate).toHaveBeenCalledTimes(2);
      service.logout();
    });

    it('should not set client if not logged in', () => {
      spyOn(service, 'getCurrentClient').and.callThrough();
      component.ngOnInit();

      expect(component.client).toBeUndefined();
      expect(service.getCurrentClient).toHaveBeenCalled();
    });
  });

  describe('#logout', () => {
    it('should logout and redirect', () => {
      spyOn(service, 'logout').and.callThrough();
      spyOn(router, 'navigate');
      component.logout();

      expect(service.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

});
