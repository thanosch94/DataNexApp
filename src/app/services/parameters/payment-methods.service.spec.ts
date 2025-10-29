/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentMethodsService } from './payment-methods.service';

describe('Service: PaymentMethods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentMethodsService]
    });
  });

  it('should ...', inject([PaymentMethodsService], (service: PaymentMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
