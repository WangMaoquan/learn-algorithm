import { describe, it, expect } from 'vitest';
import { removeElement } from '../first';
import { removeDuplicates } from '../second';
import { removeDuplicates as removeDuplicatesTrird } from '../third';
import { majorityElement, majorityElement1 } from '../fourth';
import { rotate } from '../fifth';

describe('2023-11-02', () => {
  it('first', () => {
    const r = removeElement([3, 2, 2, 3], 3);
    expect(r).toBe(2);
  });

  it('second', () => {
    const r = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
    expect(r).toBe(5);
  });

  it('third', () => {
    const r = removeDuplicatesTrird([1, 1, 1, 2, 2, 3]);
    expect(r).toBe(5);
  });

  it('fourth', () => {
    const r = majorityElement([3, 2, 3]);
    const r1 = majorityElement1([
      1000000000, 1000000000, -1000000000, -1000000000, -1000000000,
    ]);
    expect(r).toBe(3);
    expect(r1).toBe(-1000000000);
  });

  it('fifth', () => {
    const nums = [-1, -100, 3, 99];
    rotate(nums, 2);
    expect(nums).toEqual([3, 99, -1, -100]);
    const nums1 = [1, 2, 3, 4, 5, 6, 7];
    rotate(nums1, 3);
    expect(nums1).toEqual([5, 6, 7, 1, 2, 3, 4]);
    const nums2 = [1, 2];
    rotate(nums2, 5);
    expect(nums2).toEqual([2, 1]);
  });
});
