/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAppPermissionsService } from './user-app-permissions.service';

describe('Service: UserAppPermissions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAppPermissionsService]
    });
  });

  it('should ...', inject([UserAppPermissionsService], (service: UserAppPermissionsService) => {
    expect(service).toBeTruthy();
  }));
});
