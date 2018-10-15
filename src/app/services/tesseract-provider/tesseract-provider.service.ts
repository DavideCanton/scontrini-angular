import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class TesseractProviderService {
    getTesseract(): Tesseract.TesseractStatic {
        return Tesseract.create({
            workerPath: 'https://cdn.rawgit.com/naptha/tesseract.js/0.2.0/dist/worker.js',
            langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
            corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
        });
    }
}
