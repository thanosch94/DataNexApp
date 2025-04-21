import { TestBed } from '@angular/core/testing';

import { StateHelperService } from './state-helper.service';

describe('StateHelperService', () => {
  let service: StateHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
