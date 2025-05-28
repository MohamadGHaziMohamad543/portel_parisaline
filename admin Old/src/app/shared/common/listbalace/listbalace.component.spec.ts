import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbalaceComponent } from './listbalace.component';

describe('ListbalaceComponent', () => {
  let component: ListbalaceComponent;
  let fixture: ComponentFixture<ListbalaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbalaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbalaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
