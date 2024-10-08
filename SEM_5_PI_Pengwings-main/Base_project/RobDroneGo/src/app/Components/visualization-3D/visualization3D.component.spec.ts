import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visualization3DComponent } from './visualization3D.component';

describe('CubeComponent', () => {
  let component: Visualization3DComponent;
  let fixture: ComponentFixture<Visualization3DComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Visualization3DComponent]
    });
    fixture = TestBed.createComponent(Visualization3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
