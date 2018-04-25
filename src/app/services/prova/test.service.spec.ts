import { TestBed, inject, async } from '@angular/core/testing';

import { TestService } from './test.service';
import { ait } from '../../utils/utils';

describe('TestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService]
    });
  });

  it('should be created', async(inject([TestService], async (service: TestService) => {
    expect(service).toBeTruthy();

    const obs = service.getResp();

    const ret = await obs.toPromise();

    expect(ret).toBe('cacca');
  })));
});
