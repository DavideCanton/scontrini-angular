import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { UnsafeHtmlPipe } from './unsafe-html.pipe';

describe('UnsafeHtmlPipe', () => {
  it('create an instance', inject([DomSanitizer], (sanitizer) => {
    const pipe = new UnsafeHtmlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  }));
});
