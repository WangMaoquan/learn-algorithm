import { describe, it, expect } from 'vitest';
import { minSubArrayLen } from '..';

describe('2023-11-19', () => {
  it('长度最小的子数组', () => {
    const r = minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
    expect(r).toEqual(2);

    const r1 = minSubArrayLen(4, [1, 4, 4]);
    expect(r1).toEqual(1);

    const r2 = minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]);
    expect(r2).toEqual(0);
  });
});
