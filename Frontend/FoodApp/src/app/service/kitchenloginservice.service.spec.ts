import { TestBed } from '@angular/core/testing';

import { KitchenloginserviceService } from './kitchenloginservice.service';

describe('KitchenloginserviceService', () => {
  let service: KitchenloginserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenloginserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
