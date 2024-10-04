import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMinMaxBuildingComponent } from './list-min-max-building.component';

describe('ListMinMaxBuildingComponent', () => {
  let component: ListMinMaxBuildingComponent;
  let fixture: ComponentFixture<ListMinMaxBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMinMaxBuildingComponent]
    });
    fixture = TestBed.createComponent(ListMinMaxBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
