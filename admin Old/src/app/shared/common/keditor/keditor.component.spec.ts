import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeditorComponent } from './keditor.component';

describe('KeditorComponent', () => {
  let component: KeditorComponent;
  let fixture: ComponentFixture<KeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
