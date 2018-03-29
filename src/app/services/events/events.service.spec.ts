import { TestBed, inject } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService]
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));

  it('should notify correctly', inject([EventsService], async (service: EventsService) => {
    expect(service).toBeTruthy();

    const spy = jasmine.createSpy('spy');

    service.getObservable<boolean>('loading').subscribe(spy);

    service.setValue('loading', true);

    expect(spy.calls.count()).toBe(1);

    service.setValue('loading', false);

    expect(spy.calls.count()).toBe(2);
    expect(spy.calls.argsFor(0)).toEqual([true]);
    expect(spy.calls.argsFor(1)).toEqual([false]);
  }));

  it('should filter same value', inject([EventsService], async (service: EventsService) => {
    expect(service).toBeTruthy();

    const spy = jasmine.createSpy('spy');

    service.getObservableDistinct<boolean>('loading').subscribe(spy);

    service.setValue('loading', true);
    service.setValue('loading', true);

    expect(spy.calls.count()).toBe(1);

    service.setValue('loading', false);
    expect(spy.calls.count()).toBe(2);

    service.setValue('loading', true);
    expect(spy.calls.count()).toBe(3);
  }));
});
