import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguargGuard } from './authguarg.guard';

describe('AuthguargGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguargGuard]
    });
  });

  it('should ...', inject([AuthguargGuard], (guard: AuthguargGuard) => {
    expect(guard).toBeTruthy();
  }));
});
