import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRegisterComponent } from './menu-register.component';

describe('MenuRegisterComponent', () => {
  let component: MenuRegisterComponent;
  let fixture: ComponentFixture<MenuRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRegisterComponent]
    });
    fixture = TestBed.createComponent(MenuRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
