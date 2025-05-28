import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricestrategyComponent } from './pricestrategy.component';

describe('PricestrategyComponent', () => {
  let component: PricestrategyComponent;
  let fixture: ComponentFixture<PricestrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricestrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricestrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
