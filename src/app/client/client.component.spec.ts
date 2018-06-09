import { DUMMY_ORDERS, DUMMY_CLIENTS } from './../_services/data.mock.service.spec';
import { TestBed } from '@angular/core/testing';
import { DataService, DataServiceMock, DUMMY_RESERVATIONS } from './../_services';
import { stringify } from 'querystring';
import { ClientComponent } from './client.component';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock }
      ]
    });
    component = TestBed.createComponent(ClientComponent).componentInstance;
    service = TestBed.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      service.login({ username: 'username', passwd: 'password' });
      component.ngOnInit();
    });

    afterEach(() => {
      service.logout();
    });

    it('should set Reservations', () => {
      expect(stringify(component.reservations)).toBe(stringify(DUMMY_RESERVATIONS));
    });

    it('should set Order', () => {
      expect(stringify(component.orders)).toBe(stringify(DUMMY_ORDERS));
    });

    it('should set client details', () => {
      expect(stringify(component.client)).toBe(stringify(DUMMY_CLIENTS[0]));
    });
  });
});
