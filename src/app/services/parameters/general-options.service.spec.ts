/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeneralOptionsService } from './general-options.service';

describe('Service: GeneralOptions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralOptionsService]
    });
  });

  it('should ...', inject([GeneralOptionsService], (service: GeneralOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
