import { describe, test, expect } from 'vitest';
import { rangeOfCombination } from '.';

describe('range of combinations', () => {
  test('1 - n, 之间满足 k 长度的组合', () => {
    expect(rangeOfCombination(4, 2)).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);
  });
});
