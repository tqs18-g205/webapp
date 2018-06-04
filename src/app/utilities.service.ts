import { Injectable, NgModule } from '@angular/core';

@NgModule()
@Injectable()
export class UtilitiesService {

  constructor() { }

  intersect(array1: any[], array2: any[]): boolean {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (JSON.stringify(array1[i]) === JSON.stringify(array2[j])) {
          return true;
        }
      }
    }
    return false;
  }

}
