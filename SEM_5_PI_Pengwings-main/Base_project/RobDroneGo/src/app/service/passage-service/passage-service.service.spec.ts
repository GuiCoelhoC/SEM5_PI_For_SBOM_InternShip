import { TestBed } from '@angular/core/testing';

import { PassageService } from './passage-service.service';

describe('PassageServiceService', () => {
  let service: PassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
