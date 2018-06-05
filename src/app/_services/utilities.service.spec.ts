import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { UtilitiesService } from './';

describe('#intersect', () => {
  let injector: TestBed;
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilitiesService]
    });
    injector = getTestBed();
    service = injector.get(UtilitiesService);
  });

  it('should have no intersection between [0, 1, 2] and [3, 4, 5])', () => {
    service.intersect([0, 1, 2], [3, 4, 5]);
    expect(service.intersect([0, 1, 2], [3, 4, 5])).toBeFalsy();
  });

  it('should have some intersection between [0, 1, 2] and [2, 4, 5])', () => {
    service.intersect([0, 1, 2], [2, 4, 5]);
    expect(service.intersect([0, 1, 2], [2, 4, 5])).toBeTruthy();
  });

});
