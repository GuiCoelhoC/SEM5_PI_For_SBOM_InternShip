import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFloorComponent } from './update-floor.component';

describe('UpdateFloorComponent', () => {
  let component: UpdateFloorComponent;
  let fixture: ComponentFixture<UpdateFloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFloorComponent]
    });
    fixture = TestBed.createComponent(UpdateFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
