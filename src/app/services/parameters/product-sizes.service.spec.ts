/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductSizesService } from './product-sizes.service';

describe('Service: ProductSizes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSizesService]
    });
  });

  it('should ...', inject([ProductSizesService], (service: ProductSizesService) => {
    expect(service).toBeTruthy();
  }));
});
