/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VatClassesService } from './vat-classes.service';

describe('Service: VatClasses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VatClassesService]
    });
  });

  it('should ...', inject([VatClassesService], (service: VatClassesService) => {
    expect(service).toBeTruthy();
  }));
});
