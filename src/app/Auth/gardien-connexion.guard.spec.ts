import { TestBed } from '@angular/core/testing';

import { GardienConnexionGuard } from './gardien-connexion.guard';

describe('GardienConnexionGuard', () => {
  let guard: GardienConnexionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GardienConnexionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

