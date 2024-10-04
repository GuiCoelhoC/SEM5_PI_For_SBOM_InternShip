import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateElevatorComponent } from './update-elevator.component';

describe('UpdateElevatorComponent', () => {
  let component: UpdateElevatorComponent;
  let fixture: ComponentFixture<UpdateElevatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateElevatorComponent]
    });
    fixture = TestBed.createComponent(UpdateElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
