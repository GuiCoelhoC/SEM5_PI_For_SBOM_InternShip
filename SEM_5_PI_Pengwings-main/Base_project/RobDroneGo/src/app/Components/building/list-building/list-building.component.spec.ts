import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingComponent } from './list-building.component';

describe('ListBuildingComponent', () => {
  let component: ListBuildingComponent;
  let fixture: ComponentFixture<ListBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingComponent]
    });
    fixture = TestBed.createComponent(ListBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
