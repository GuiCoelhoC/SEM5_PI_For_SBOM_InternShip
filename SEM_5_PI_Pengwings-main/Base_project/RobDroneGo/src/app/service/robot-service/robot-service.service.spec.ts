import { TestBed } from '@angular/core/testing';

import { RobotService } from './robot.service';

describe('RobotServiceService', () => {
  let service: RobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
