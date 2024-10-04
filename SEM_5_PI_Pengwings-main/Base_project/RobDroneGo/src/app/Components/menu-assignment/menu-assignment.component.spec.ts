import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAssignmentComponent } from './menu-assignment.component';

describe('MenuAssignmentComponent', () => {
  let component: MenuAssignmentComponent;
  let fixture: ComponentFixture<MenuAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAssignmentComponent]
    });
    fixture = TestBed.createComponent(MenuAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
