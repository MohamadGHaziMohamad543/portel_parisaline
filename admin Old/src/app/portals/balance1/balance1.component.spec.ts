import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Balance1Component } from './balance1.component';

describe('Balance1Component', () => {
  let component: Balance1Component;
  let fixture: ComponentFixture<Balance1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Balance1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Balance1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
