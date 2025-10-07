/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WarehousesService } from './warehouses.service';

describe('Service: Warehouses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehousesService]
    });
  });

  it('should ...', inject([WarehousesService], (service: WarehousesService) => {
    expect(service).toBeTruthy();
  }));
});
