import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionProsessComponent } from './function-prosess.component';

describe('FunctionProsessComponent', () => {
  let component: FunctionProsessComponent;
  let fixture: ComponentFixture<FunctionProsessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionProsessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionProsessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
