import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPassageComponent } from './main-passage.component';

describe('MainPassageComponent', () => {
  let component: MainPassageComponent;
  let fixture: ComponentFixture<MainPassageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPassageComponent]
    });
    fixture = TestBed.createComponent(MainPassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
