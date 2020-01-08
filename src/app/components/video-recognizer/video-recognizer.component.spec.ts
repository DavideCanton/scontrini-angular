import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';
import { ProgressbarModule, TooltipModule } from 'ngx-bootstrap';

import { VideoRecognizerComponent } from './video-recognizer.component';

describe('VideoRecognizerComponent', () =>
{
    let spectator: Spectator<VideoRecognizerComponent>;
    const createComponent = createComponentFactory({
        component: VideoRecognizerComponent,
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
    });

    beforeEach(() =>
    {
        spectator = createComponent();
    });

    it('should create', () =>
    {
        expect(spectator.component).toBeTruthy();
    });
});
