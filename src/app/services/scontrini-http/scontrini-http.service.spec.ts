import { TestBed, inject } from '@angular/core/testing';

import { ScontriniHttpService } from './scontrini-http.service';
import { Http, HttpModule } from '@angular/http';

describe('ScontriniHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ScontriniHttpService]
    });
  });

  it('should be created', inject([ScontriniHttpService], (service: ScontriniHttpService) => {
    expect(service).toBeTruthy();
  }));
});
