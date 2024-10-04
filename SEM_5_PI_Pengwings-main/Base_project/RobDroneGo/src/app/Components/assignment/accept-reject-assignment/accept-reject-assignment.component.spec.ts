import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectAssignmentComponent } from './accept-reject-assignment.component';

describe('AcceptRejectAssignmentComponent', () => {
  let component: AcceptRejectAssignmentComponent;
  let fixture: ComponentFixture<AcceptRejectAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptRejectAssignmentComponent]
    });
    fixture = TestBed.createComponent(AcceptRejectAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
