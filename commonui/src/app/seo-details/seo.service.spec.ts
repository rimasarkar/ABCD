import { TestBed, inject } from '@angular/core/testing';

import { SeoService } from './seo.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService],
      imports: [HttpClientModule, HttpModule]
    });
  });

  it('should be created', inject([HttpClient,SeoService], (service: SeoService) => {
    expect(service).toBeTruthy();
  }));
});
