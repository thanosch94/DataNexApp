/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentSeriesService } from './document-series.service';

describe('Service: DocumentSeries', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentSeriesService]
    });
  });

  it('should ...', inject([DocumentSeriesService], (service: DocumentSeriesService) => {
    expect(service).toBeTruthy();
  }));
});
