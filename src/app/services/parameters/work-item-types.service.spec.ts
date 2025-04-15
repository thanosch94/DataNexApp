import { TestBed } from '@angular/core/testing';

import { WorkItemTypesService } from './work-item-types.service';

describe('WorkItemTypesService', () => {
  let service: WorkItemTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkItemTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
