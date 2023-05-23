import { describe, test, expect } from 'vitest';
import { singleNumber } from '.';

describe('只出现一次的数字', () => {
  test('single number', () => {
    expect(singleNumber([1, 2, 1])).toBe(2);
    expect(singleNumber([2])).toBe(2);
  });
});
