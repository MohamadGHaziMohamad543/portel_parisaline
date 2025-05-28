import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTrementComponent } from './video-trement.component';

describe('VideoTrementComponent', () => {
  let component: VideoTrementComponent;
  let fixture: ComponentFixture<VideoTrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
