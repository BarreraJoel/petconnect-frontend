import { PostTypeEnumPipe } from './post-type-enum.pipe';

describe('PostTypeEnumPipe', () => {
  it('create an instance', () => {
    const pipe = new PostTypeEnumPipe();
    expect(pipe).toBeTruthy();
  });
});
