import { TestBed, inject } from '@angular/core/testing';

import { LotoService } from './loto.service';

describe('LotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotoService]
    });
  });

  it('should be created', inject([LotoService], (service: LotoService) => {
    expect(service).toBeTruthy();
  }));
});
