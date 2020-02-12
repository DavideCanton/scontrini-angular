import { Utils } from './utils';

describe('Utils.parseDate', () => {
    it('should parse a valid date string', () => {
        const dateString = '2012-12-01T12:00:00';
        const date = Utils.parseDate(dateString);

        expect(date).not.toBeNull();
        expect(date!.date()).toBe(1);
        expect(date!.month()).toBe(11);
        expect(date!.year()).toBe(2012);
    });

    it('should return null with a not valid date string', () => {
        const dateString = 'prova';
        const date = Utils.parseDate(dateString);
        expect(date).toBeNull();
    });

    it('should return null with an incomplete date string', () => {
        const dateString = '01/12/';
        const date = Utils.parseDate(dateString);
        expect(date).toBeNull();
    });

    it('should return null with a string with an invalid format', () => {
        const dateString = '01/16/2013';
        const date = Utils.parseDate(dateString);
        expect(date).toBeNull();
    });

    it('should return null with a string with a wrong separator', () => {
        const dateString = '01-16-2013';
        const date = Utils.parseDate(dateString);
        expect(date).toBeNull();
    });
});

