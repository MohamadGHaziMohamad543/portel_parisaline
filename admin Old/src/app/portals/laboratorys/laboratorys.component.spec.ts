import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorysComponent } from './laboratorys.component';

describe('LaboratorysComponent', () => {
  let component: LaboratorysComponent;
  let fixture: ComponentFixture<LaboratorysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratorysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
