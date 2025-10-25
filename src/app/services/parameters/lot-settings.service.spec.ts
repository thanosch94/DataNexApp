/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LotSettingsService } from './lot-settings.service';

describe('Service: LotSettings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotSettingsService]
    });
  });

  it('should ...', inject([LotSettingsService], (service: LotSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
