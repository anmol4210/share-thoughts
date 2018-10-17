import { TestBed } from '@angular/core/testing';

import { TokenserviceService } from './tokenservice.service';

describe('TokenserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenserviceService = TestBed.get(TokenserviceService);
    expect(service).toBeTruthy();
  });
});
