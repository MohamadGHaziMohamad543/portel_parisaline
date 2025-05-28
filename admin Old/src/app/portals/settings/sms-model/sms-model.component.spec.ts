import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsModelComponent } from './sms-model.component';

describe('SmsModelComponent', () => {
  let component: SmsModelComponent;
  let fixture: ComponentFixture<SmsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
