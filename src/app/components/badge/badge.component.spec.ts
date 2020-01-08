import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { BadgeComponent, BadgeType } from './badge.component';

describe('BadgeComponent', () =>
{
    let spectator: Spectator<BadgeComponent>;
    const createComponent = createComponentFactory(BadgeComponent);

    beforeEach(() =>
    {
        spectator = createComponent();
    });

    it('should create', () =>
    {
        expect(spectator.component).toBeTruthy();
    });

    it('should display value', () =>
    {
        spectator.setInput({ value: '3' });
        spectator.detectChanges();

        const element = spectator.query('span.badge');
        expect(element).toHaveText('3');
    });

    it('should have info class', () =>
    {
        spectator.setInput({ value: '3', type: BadgeType.Info });
        spectator.detectChanges();

        const element = spectator.query('span.badge');

        expect(spectator.component.type).toBe(BadgeType.Info);
        expect(element).toHaveClass('info');
        expect(element).toHaveText('3');
    });

    it('should have info as default class', () =>
    {
        spectator.setInput({ value: '3' });
        spectator.detectChanges();

        const element = spectator.query('span.badge');
        expect(spectator.component.type).toBe(BadgeType.Info);
        expect(element).toHaveClass('info');
        expect(element).toHaveText('3');
    });

    it('should have warning class', () =>
    {
        spectator.setInput({ value: '3', type: BadgeType.Warning });
        spectator.detectChanges();

        const element = spectator.query('span.badge');
        expect(spectator.component.type).toBe(BadgeType.Warning);
        expect(element).toHaveClass('warning');
        expect(element).toHaveText('3');
    });


    it('should have error class', () =>
    {
        spectator.setInput({ value: '3', type: BadgeType.Error });
        spectator.detectChanges();

        const element = spectator.query('span.badge');
        expect(spectator.component.type).toBe(BadgeType.Error);
        expect(element).toHaveClass('error');
        expect(element).toHaveText('3');
    });
});
