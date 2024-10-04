import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBuildingComponent } from './update-building.component';

describe('UpdateBuildingComponent', () => {
  let component: UpdateBuildingComponent;
  let fixture: ComponentFixture<UpdateBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBuildingComponent]
    });
    fixture = TestBed.createComponent(UpdateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
