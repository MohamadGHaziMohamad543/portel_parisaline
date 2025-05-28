import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarndSettingComponent } from './barnd-setting.component';

describe('BarndSettingComponent', () => {
  let component: BarndSettingComponent;
  let fixture: ComponentFixture<BarndSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarndSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarndSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
