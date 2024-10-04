import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorWithPassageComponent } from './list-floor-with-passage.component';

describe('ListFloorWithPassageComponent', () => {
  let component: ListFloorWithPassageComponent;
  let fixture: ComponentFixture<ListFloorWithPassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorWithPassageComponent]
    });
    fixture = TestBed.createComponent(ListFloorWithPassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
