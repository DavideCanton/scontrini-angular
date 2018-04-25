import { TestBed, inject } from '@angular/core/testing';

import { TestService } from './test.service';
import { ait } from '../../utils/utils';

describe('TestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService]
    });
  });

  ait('should be created', [TestService], async (service: TestService) => {
    expect(service).toBeTruthy();

    const obs = service.getResp();

    const ret = await obs.toPromise();

    expect(ret).toBe('cacca');
  });
});
