import { describe, test, expect } from 'vitest';
import { mergeTwoOrderedArrays, threeSum, twoSum } from '.';

describe('两数求和', () => {
  test('twosum', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });
});

describe('合并两个有序数组', () => {
  test('merge two ordered arrays', () => {
    expect(mergeTwoOrderedArrays([1, 2, 3], 3, [2, 5, 6], 3)).toEqual([
      1, 2, 2, 3, 5, 6,
    ]);
    expect(mergeTwoOrderedArrays([1, 2, 3], 3, [1, 2, 5, 6], 4)).toEqual([
      1, 1, 2, 2, 3, 5, 6,
    ]);
  });
});

describe('寻找数组中 三个数之和 为0', () => {
  test('three sum', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });
});
