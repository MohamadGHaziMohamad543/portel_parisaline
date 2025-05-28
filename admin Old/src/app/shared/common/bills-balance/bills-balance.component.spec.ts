import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsBalanceComponent } from './bills-balance.component';

describe('BillsBalanceComponent', () => {
  let component: BillsBalanceComponent;
  let fixture: ComponentFixture<BillsBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
