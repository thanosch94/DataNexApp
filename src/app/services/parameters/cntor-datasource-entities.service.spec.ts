import { TestBed } from '@angular/core/testing';

import { CntorDatasourceEntitiesService } from './cntor-datasource-entities.service';

describe('CntorDatasourceEntitiesService', () => {
  let service: CntorDatasourceEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CntorDatasourceEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
