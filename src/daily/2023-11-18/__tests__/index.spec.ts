import { describe, it, expect } from 'vitest';
import { twoSum } from '..';

describe('2023-11-18', () => {
  it('两数之和 II - 输入有序数组', () => {
    const r = twoSum([2, 7, 11, 15], 9);
    expect(r).toEqual([1, 2]);

    const r1 = twoSum([2, 3, 4], 6);
    expect(r1).toEqual([1, 3]);

    const r2 = twoSum([-1, 0], -1);
    expect(r2).toEqual([1, 2]);
  });
});
