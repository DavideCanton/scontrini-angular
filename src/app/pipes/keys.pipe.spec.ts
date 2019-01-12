import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  it('create an instance', () => {
    const pipe = new KeysPipe();
    expect(pipe).toBeTruthy();
  });

  it('works with null', () => {
    const pipe = new KeysPipe();
    expect(pipe).toBeTruthy();

    const array = pipe.transform(null);
    expect(array.length).toBe(0);
  });

  it('works with objects', () => {
    const pipe = new KeysPipe();
    expect(pipe).toBeTruthy();

    const array = pipe.transform({ a: 3, b: 5 });

    expect(array.length).toBe(2);
    expect(array).toContain({ key: 'a', value: 3 });
    expect(array).toContain({ key: 'b', value: 5 });
  });
});
