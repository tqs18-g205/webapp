import { NavbarComponent } from './../navbar/navbar.component';
import { AppComponent } from './../app.component';
import { TestBed } from '@angular/core/testing';
import { DataService, DataServiceMock } from './../_services';
import { stringify } from 'querystring';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Address, Client } from '../_models';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: DataService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        AppComponent,
        NavbarComponent
      ],
      imports: [RouterTestingModule.withRoutes([
        { path: '', component: AppComponent },
        { path: 'login', component: LoginComponent }])],
      providers: [
        { provide: DataService, useClass: DataServiceMock }
      ]
    });
    component = TestBed.createComponent(LoginComponent).componentInstance;
    service = TestBed.get(DataService);
    router = TestBed.get(Router);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should logout', () => {
      spyOn(service, 'logout');
      component.ngOnInit();
      expect(service.logout).toHaveBeenCalled();
    });
  });

  describe('#login', () => {
    it('should login and redirect', () => {
      const user = { username: 'username', passwd: 'password' };
      spyOn(service, 'login').and.callThrough();
      spyOn(router, 'navigate');
      component.login(user.username, user.passwd);

      expect(service.login).toHaveBeenCalledWith(user);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should warn user about error', () => {
      const user = { username: 'username', passwd: 'wrong password' };
      spyOn(service, 'login').and.callThrough();
      spyOn(window, 'alert');
      component.login(user.username, user.passwd);

      expect(service.login).toHaveBeenCalledWith(user);
      expect(alert).toHaveBeenCalledWith('Invalid Login!');
    });
  });

  describe('#register', () => {
    const address = <Address>{
      rua: 'street', localidade: 'region',
      codigoPostal: 'zipcode', distrito: 'county'
    };

    it('should register and redirect', () => {
      const client = <Client>{
        nome: 'nome', passwd: 'passwd',
        nif: 'nif', email: 'email',
        morada: address
      };
      spyOn(service, 'addClient').and.callThrough();
      spyOn(router, 'navigate');
      component.register(client.nome, client.passwd, client.email, client.nif,
        address.rua, address.localidade, address.codigoPostal,
        address.distrito);

      expect(service.addClient).toHaveBeenCalledWith(client);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should warn user about error', () => {
      const client = <Client>{
        nome: '', passwd: 'passwd',
        nif: 'nif', email: 'email',
        morada: address
      };
      spyOn(service, 'addClient').and.callThrough();
      spyOn(window, 'alert');
      component.register(client.nome, client.passwd, client.email, client.nif,
        address.rua, address.localidade, address.codigoPostal,
        address.distrito);

      expect(service.addClient).toHaveBeenCalledWith(client);
      expect(alert).toHaveBeenCalledWith('Error, please try again later!');
    });
  });
});
