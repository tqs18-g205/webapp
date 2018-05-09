import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateListComponent } from './plate-list.component';
import { PlateService } from '../plate.service';
import { HttpClientModule } from '@angular/common/http'; 

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let fixture: ComponentFixture<PlateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateListComponent ],
      imports: [PlateService, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
