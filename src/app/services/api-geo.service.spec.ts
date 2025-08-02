import { TestBed } from '@angular/core/testing';

import { ApiGeoService } from './api-geo.service';

describe('ApiGeoService', () => {
  let service: ApiGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
