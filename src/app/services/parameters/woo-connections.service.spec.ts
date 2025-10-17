/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WooConnectionsService } from './woo-connections.service';

describe('Service: WooConnections', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WooConnectionsService]
    });
  });

  it('should ...', inject([WooConnectionsService], (service: WooConnectionsService) => {
    expect(service).toBeTruthy();
  }));
});
