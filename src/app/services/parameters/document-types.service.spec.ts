/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentTypesService } from './document-types.service';

describe('Service: DocumentTypes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentTypesService]
    });
  });

  it('should ...', inject([DocumentTypesService], (service: DocumentTypesService) => {
    expect(service).toBeTruthy();
  }));
});
