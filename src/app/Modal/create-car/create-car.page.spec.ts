import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarPage } from './create-car.page';

describe('CreateCarPage', () => {
  let component: CreateCarPage;
  let fixture: ComponentFixture<CreateCarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
