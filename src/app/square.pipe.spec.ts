import { SquarePipe } from './custom.pipe';

describe('SquarePipe', () => {
  it('create an instance', () => {
    const pipe = new SquarePipe();
    expect(pipe).toBeTruthy();
  });
});
