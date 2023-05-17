import { describe, test, expect } from 'vitest';
import { threeSum } from '.';
describe('数组之内三个元素加起来为0', () => {
  test('碰撞指针', () => {
    const nums = [-1, 0, 1, 2, -1, -4];
    expect(threeSum(nums)).toEqual([
      [-1, 0, 1],
      [-1, -1, 2],
    ]);
  });
});
