import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlateListComponent } from './plate-list/plate-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService, DataServiceMock } from './_services';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, NavbarComponent, PlateListComponent
      ], imports: [RouterTestingModule], providers: [{ provide: DataService, useClass: DataServiceMock }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'GoNutri'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('GoNutri');
  }));
});
