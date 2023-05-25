import { describe, test, expect } from 'vitest';
import { findMiddleIndex } from '.';

describe('给你一个下标从 0 开始的整数数组 nums ，请你找到 最左边 的中间位置 middleIndex （也就是所有可能中间位置下标最小的一个)', () => {
  test('findMiddleIndex', () => {
    expect(findMiddleIndex([1])).toBe(0);
    expect(findMiddleIndex([2, 3, -1, 8, 4])).toBe(3);
    expect(findMiddleIndex([1, -1, 4])).toBe(2);
    expect(findMiddleIndex([2, 5])).toBe(-1);
  });
});
