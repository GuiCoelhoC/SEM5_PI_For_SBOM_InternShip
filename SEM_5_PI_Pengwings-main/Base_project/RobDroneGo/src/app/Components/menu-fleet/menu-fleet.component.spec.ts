import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFleetComponent } from './menu-fleet.component';

describe('MenuFleetComponent', () => {
  let component: MenuFleetComponent;
  let fixture: ComponentFixture<MenuFleetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFleetComponent]
    });
    fixture = TestBed.createComponent(MenuFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
