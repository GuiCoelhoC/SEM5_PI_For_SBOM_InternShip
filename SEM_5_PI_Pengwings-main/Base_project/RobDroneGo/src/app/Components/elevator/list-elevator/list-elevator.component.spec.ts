import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElevatorComponent } from './list-elevator.component';

describe('ListElevatorComponent', () => {
  let component: ListElevatorComponent;
  let fixture: ComponentFixture<ListElevatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListElevatorComponent]
    });
    fixture = TestBed.createComponent(ListElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should list', () => {
    expect(component).toBeTruthy();
  });
});
