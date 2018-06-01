import { TestBed, inject } from '@angular/core/testing';

import { OlmService } from './olm.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('OlmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OlmService],
      imports: [HttpClientModule, HttpModule]
    });
  });

  it('should be created', inject([HttpClient,OlmService], (service: OlmService) => {
    expect(service).toBeTruthy();
  }));
});