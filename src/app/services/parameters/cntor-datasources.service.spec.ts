/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CntorDatasourcesService } from './cntor-datasources.service';

describe('Service: CntorDatasources', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CntorDatasourcesService]
    });
  });

  it('should ...', inject([CntorDatasourcesService], (service: CntorDatasourcesService) => {
    expect(service).toBeTruthy();
  }));
});
