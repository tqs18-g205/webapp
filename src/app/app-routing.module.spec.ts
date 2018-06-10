import { AppRoutingModule } from './app-routing.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart/cart.component';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
