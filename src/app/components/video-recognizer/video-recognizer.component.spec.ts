import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule, TooltipModule } from 'ngx-bootstrap';

import { VideoRecognizerComponent } from './video-recognizer.component';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';

describe('VideoRecognizerComponent', () => {
  let component: VideoRecognizerComponent;
  let fixture: ComponentFixture<VideoRecognizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoRecognizerComponent
      ],
      imports: [
        TooltipModule.forRoot(),
        ProgressbarModule.forRoot(),
        FormsModule
      ],
      providers: [
        TesseractProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecognizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
