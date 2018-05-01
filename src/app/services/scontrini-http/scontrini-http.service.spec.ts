import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ScontriniHttpService } from './scontrini-http.service';


describe('ScontriniHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScontriniHttpService]
    });
  });

  it('should be created', inject([ScontriniHttpService], (service: ScontriniHttpService) => {
    expect(service).toBeTruthy();
  }));
});
