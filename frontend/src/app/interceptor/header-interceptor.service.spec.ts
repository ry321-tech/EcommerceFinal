import { TestBed } from '@angular/core/testing';

import { HeaderInterceptorService } from './header-interceptor.service';

describe('HeaderInterceptorService', () => {
  let service: HeaderInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
