import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasPage } from './personas.page';

describe('PersonasPage', () => {
  let component: PersonasPage;
  let fixture: ComponentFixture<PersonasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
