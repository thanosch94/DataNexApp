/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdditionalChargesService } from './additional-charges.service';

describe('Service: AdditionalCharges', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionalChargesService]
    });
  });

  it('should ...', inject([AdditionalChargesService], (service: AdditionalChargesService) => {
    expect(service).toBeTruthy();
  }));
});
