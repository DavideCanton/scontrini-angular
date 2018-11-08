import { Utils, getSafe } from './utils';

describe('Utils.parseDate', () => {
    it('should parse a valid date string', () => {
        const dateString = '2012-12-01T12:00:00';
        const date = Utils.parseDate(dateString);

        expect(date).not.toBeNull();
        expect(date.date()).toBe(1);
        expect(date.month()).toBe(11);
        expect(date.year()).toBe(2012);
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

describe('getSafe', () => {
    it('should work with 1 parameter not null', () => {
        const a = { n: 10 };
        expect(getSafe(a, 'n')).toBe(10);
    });

    it('should work with 1 parameter null', () => {
        const a = null;
        expect(getSafe(a, 'n')).toBe(null);
    });

    it('should work with 2 parameters not null', () => {
        const a = { n: { k: 20 } };
        expect(getSafe(a, 'n', 'k')).toBe(20);
    });

    it('should work with 2 parameters null', () => {
        const a = { n: null };
        expect(getSafe(a, 'n', 'k')).toBe(null);

        const b = null;
        expect(getSafe(b, 'n', 'k')).toBe(null);
    });

    class A { n: number; }
    class B { a: A | null; }
    class C { b: B | null; }
    class D { c: C | null; }

    it('should compile with 3 args', () => {
        const a = new A();
        a.n = 10;
        const b = new B();
        b.a = a;
        const c = new C();
        c.b = b;
        const d = new D();
        d.c = c;

        expect(getSafe(d, 'c', 'b', 'a', 'n')).toBe(10);
    });
    it('should compile with 3 args null value', () => {
        const d = new D();

        expect(getSafe(d, 'c', 'b', 'a', 'n')).toBeNull();
    });
});
