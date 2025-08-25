/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddressesService } from './addresses.service';

describe('Service: Addresses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressesService]
    });
  });

  it('should ...', inject([AddressesService], (service: AddressesService) => {
    expect(service).toBeTruthy();
  }));
});
