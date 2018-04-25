import { TestBed, inject } from '@angular/core/testing';
import 'rxjs/add/operator/toArray';
import { ScontriniMockService } from './scontrini-mock.service';

describe('ScontriniMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScontriniMockService]
    });
  });

  it('should be created', inject([ScontriniMockService], (service: ScontriniMockService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve the correct number of scontrini', inject([ScontriniMockService], async (service: ScontriniMockService) => {
    expect(service).toBeTruthy();

    service.n = 5;

    service.retrieveScontrini().toArray().subscribe(res => {
      expect(res.length).toBe(5);
    });
  }));
});
