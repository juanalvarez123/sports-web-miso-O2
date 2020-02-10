import { TestBed } from '@angular/core/testing';

import { AthletesService } from './athletes.service';

describe('AthletesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AthletesService = TestBed.get(AthletesService);
    expect(service).toBeTruthy();
  });
});
