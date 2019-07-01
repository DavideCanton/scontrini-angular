import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { TesseractProviderService } from 'app/services/tesseract-provider/tesseract-provider.service';
import * as _ from 'lodash';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import * as Tesseract from 'tesseract.js';

export interface IRect
{
    x: number;
    y: number;
    w: number;
    h: number;
}


export interface IWordRect extends IRect
{
    word: string;
    confidence: number;
}

export interface IMessage
{
    status: string;
    progress: number;
}

@Component({
    selector: 'app-video-recognizer',
    templateUrl: './video-recognizer.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./video-recognizer.component.scss']
})
export class VideoRecognizerComponent implements AfterViewInit, OnDestroy
{
    @ViewChild('video')
    video: ElementRef<HTMLVideoElement>;

    @ViewChild('canvasContainer')
    canvasContainer: ElementRef<HTMLDivElement>;

    @ViewChild('shownCanvas')
    shownCanvas: ElementRef<HTMLCanvasElement>;

    @ViewChildren(TooltipDirective)
    tooltips: QueryList<TooltipDirective>;

    videoCanvas: fx.FxCanvas;
    texture: fx.FxTexture;
    rafHandle: number;

    messages: IMessage[];
    out: Tesseract.Page;
    loading = false;
    notCaptured = true;

    brightness = 0;
    contrast = 0;
    denoise = 0;
    unsharpRadius = 0;
    unsharpStrength = 0;

    applyDenoise = false;
    applyUnsharp = false;

    canvasWidth = 1280;
    canvasHeight = 720;

    canvasShownWidth = 640;
    canvasShownHeight = 480;

    rects: IWordRect[];

    constructor(
        private tesseractProvider: TesseractProviderService
    ) { }

    ngAfterViewInit()
    {
        const options = {
            video: {
                width: { min: this.canvasWidth },
                height: { min: this.canvasHeight },
                facingMode: 'environment'
            },
            audio: false
        };

        navigator.mediaDevices.getUserMedia(options)
            .then(s => this.onSuccess(s))
            .catch(e => this.onError(e));


        const canvas = fx.canvas();
        this.canvasContainer.nativeElement.insertBefore(canvas, this.shownCanvas.nativeElement);
        this.videoCanvas = canvas;
        this.texture = this.videoCanvas.texture(this.video.nativeElement);

        this.scheduleRequestAnimationFrame();
    }

    ngOnDestroy()
    {
        window.cancelAnimationFrame(this.rafHandle);

        const stream = <MediaStream>this.video.nativeElement.srcObject;

        if(stream)
        {
            stream.getAudioTracks().forEach(track => track.stop());

            stream.getVideoTracks().forEach(track => track.stop());
        }
    }

    requestAnimationFrameCallback()
    {

        this.texture.loadContentsOf(this.video.nativeElement);

        let updatedCanvas = this.videoCanvas
            .draw(this.texture)
            .brightnessContrast(this.brightness, this.contrast)
            .hueSaturation(0, -1);

        if(this.applyDenoise)
            updatedCanvas = updatedCanvas.denoise(this.denoise);

        if(this.applyUnsharp)
            updatedCanvas = updatedCanvas.unsharpMask(this.unsharpRadius, this.unsharpStrength);

        updatedCanvas.update();

        this.scheduleRequestAnimationFrame();
    }

    scheduleRequestAnimationFrame()
    {
        this.rafHandle = requestAnimationFrame(() => this.requestAnimationFrameCallback());
    }


    onSuccess(stream: MediaStream)
    {
        this.video.nativeElement.srcObject = stream;
    }

    onError(err: any)
    {
        console.log(`An error occured! ${err}`);
    }

    updateMessages(message: IMessage)
    {
        if(!_.isNumber(message.progress))
            message.progress = 100;
        else
        {
            message.progress *= 100;
            message.progress = Math.round(message.progress * 100) / 100;
        }

        const last: IMessage | null = _.last(this.messages) || null;

        if(last && last.status === message.status)
            this.messages[this.messages.length - 1] = message;
        else
            this.messages.push(message);
    }

    showTooltip(i: number)
    {
        const tooltip = this.tooltips.find((_item, j) => j === i);
        if(tooltip)
            tooltip.toggle();
    }

    reset()
    {
        this.notCaptured = true;
        this.showVideoCanvasUpdate();
    }

    capture()
    {
        this.loading = true;
        this.messages = [];
        this.notCaptured = false;
        this.showVideoCanvasUpdate();

        const options = {
            lang: 'ita',
        };

        const vctx = this.shownCanvas.nativeElement.getContext('2d');

        if(!vctx)
        {
            this.updateMessages({
                status: 'Cannot load context',
                progress: 100
            });
            return;
        }

        const srcCanvas = this.videoCanvas;

        vctx.drawImage(srcCanvas, 0, 0, srcCanvas.width, srcCanvas.height);

        this.tesseractProvider.getTesseract().recognize(vctx, options)
            .progress((message: IMessage) => this.updateMessages(message))
            .then(result =>
            {
                this.out = result;
                this.drawBoxes();
            })
            .finally(() =>
            {
                this.loading = false;
            });
    }

    private drawBoxes()
    {
        const vctx = this.shownCanvas.nativeElement.getContext('2d');
        this.rects = [];

        this.out.words
            .filter(w => w.confidence > 60)
            .forEach(w =>
            {
                const bb = w.bbox;

                const rect = <IWordRect>{
                    x: bb.x0 / this.canvasWidth * this.canvasShownWidth,
                    y: bb.y0 / this.canvasHeight * this.canvasShownHeight,
                    w: (bb.x1 - bb.x0) / this.canvasWidth * this.canvasShownWidth,
                    h: (bb.y1 - bb.y0) / this.canvasHeight * this.canvasShownHeight,
                    word: w.text,
                    confidence: w.confidence
                };
                this.rects.push(rect);

                vctx.rect(bb.x0, bb.y0, bb.x1 - bb.x0, bb.y1 - bb.y0);
                vctx.strokeStyle = 'red';
                vctx.stroke();
            });

        this.rects.sort((a, b) => b.confidence - a.confidence);
    }

    private showVideoCanvasUpdate()
    {
        const value = this.notCaptured ? 'block' : 'none';
        this.videoCanvas.style.display = value;
    }
}
