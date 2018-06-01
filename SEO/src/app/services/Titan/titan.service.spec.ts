import { TestBed, inject } from '@angular/core/testing';

import { TitanService } from './titan.service';

describe('TitanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitanService]
    });
  });

  it('should be created', inject([TitanService], (service: TitanService) => {
    expect(service).toBeTruthy();
  }));
});
