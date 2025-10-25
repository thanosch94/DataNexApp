/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CntorParametersService } from './cntor-parameters.service';

describe('Service: CntorParameters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CntorParametersService]
    });
  });

  it('should ...', inject([CntorParametersService], (service: CntorParametersService) => {
    expect(service).toBeTruthy();
  }));
});
