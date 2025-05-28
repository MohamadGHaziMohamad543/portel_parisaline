import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmtionTextComponent } from './submtion-text.component';

describe('SubmtionTextComponent', () => {
  let component: SubmtionTextComponent;
  let fixture: ComponentFixture<SubmtionTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmtionTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmtionTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
