import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfondpageComponent } from './notfondpage.component';

describe('NotfondpageComponent', () => {
  let component: NotfondpageComponent;
  let fixture: ComponentFixture<NotfondpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotfondpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfondpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
