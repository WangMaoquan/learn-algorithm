import { describe, test, expect } from 'vitest';
import { searchInsert } from '.';

describe('搜索插入位置', () => {
  test('search insert', () => {
    expect(searchInsert([1, 2, 3, 4], 5)).toBe(4);
    expect(searchInsert([1, 2, 3, 4], 4)).toBe(3);
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });
});
