import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPendingComponent } from './list-pending.component';

describe('ListPendingComponent', () => {
  let component: ListPendingComponent;
  let fixture: ComponentFixture<ListPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPendingComponent]
    });
    fixture = TestBed.createComponent(ListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
