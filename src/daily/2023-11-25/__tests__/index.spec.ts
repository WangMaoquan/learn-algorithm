import { describe, it, expect } from 'vitest';
import { threeSum } from '..';

describe('2023-11-25', () => {
  it('三数之和', () => {
    const r = threeSum([-1, 0, 1, 2, -1, -4]);
    expect(r).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);

    const r1 = threeSum([0, 1, 1]);
    expect(r1).toEqual([]);

    const r2 = threeSum([0, 0, 0]);
    expect(r2).toEqual([[0, 0, 0]]);
  });
});
