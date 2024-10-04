import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassageComponent } from './update-passage.component';

describe('UpdatePassageComponent', () => {
  let component: UpdatePassageComponent;
  let fixture: ComponentFixture<UpdatePassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePassageComponent]
    });
    fixture = TestBed.createComponent(UpdatePassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
