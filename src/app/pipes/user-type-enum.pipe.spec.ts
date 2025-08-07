import { UserTypeEnumPipe } from './user-type-enum.pipe';

describe('UserTypeEnumPipe', () => {
  it('create an instance', () => {
    const pipe = new UserTypeEnumPipe();
    expect(pipe).toBeTruthy();
  });
});
