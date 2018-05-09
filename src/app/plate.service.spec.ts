import { TestBed, inject } from '@angular/core/testing';

import { PlateService } from './plate.service';
import { HttpClientModule } from '@angular/common/http'; 

describe('PlateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlateService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([PlateService], (service: PlateService) => {
    expect(service).toBeTruthy();
  }));
});
