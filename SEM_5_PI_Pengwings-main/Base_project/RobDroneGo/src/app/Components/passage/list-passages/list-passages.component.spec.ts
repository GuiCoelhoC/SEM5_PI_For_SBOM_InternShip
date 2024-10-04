import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassagesComponent } from './list-passages.component';

describe('ListPassagesComponent', () => {
  let component: ListPassagesComponent;
  let fixture: ComponentFixture<ListPassagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPassagesComponent]
    });
    fixture = TestBed.createComponent(ListPassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
