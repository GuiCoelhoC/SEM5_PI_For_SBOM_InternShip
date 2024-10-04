import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdministratorComponent } from './menu-administrator.component';

describe('MenuAdministratorComponent', () => {
  let component: MenuAdministratorComponent;
  let fixture: ComponentFixture<MenuAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAdministratorComponent]
    });
    fixture = TestBed.createComponent(MenuAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
