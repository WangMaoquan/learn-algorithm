import { describe, test, expect } from 'vitest';
import { addBinary, addBinary1, addBinary2 } from '.';

describe('add binary', () => {
  test('两个二进制字符串相加', () => {
    expect(addBinary('11', '1')).toEqual('100');
    expect(addBinary('1010', '1011')).toEqual('10101');
    expect(addBinary('1111', '1111')).toEqual('11110');
  });
  test('addBinary1', () => {
    expect(addBinary1('11', '1')).toEqual('100');
    expect(addBinary1('1010', '1011')).toEqual('10101');
    expect(addBinary1('1111', '1111')).toEqual('11110');
  });
  test('addBinary2', () => {
    expect(addBinary2('11', '1')).toEqual('100');
    expect(addBinary2('1010', '1011')).toEqual('10101');
    expect(addBinary2('1111', '1111')).toEqual('11110');
  });
});
