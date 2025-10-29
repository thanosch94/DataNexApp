/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShippingMethodsService } from './shipping-methods.service';

describe('Service: ShippingMethods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingMethodsService]
    });
  });

  it('should ...', inject([ShippingMethodsService], (service: ShippingMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
