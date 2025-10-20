/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentAdditionalChargesService } from './document-additional-charges.service';

describe('Service: DocumentAdditionalCharges', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentAdditionalChargesService]
    });
  });

  it('should ...', inject([DocumentAdditionalChargesService], (service: DocumentAdditionalChargesService) => {
    expect(service).toBeTruthy();
  }));
});
