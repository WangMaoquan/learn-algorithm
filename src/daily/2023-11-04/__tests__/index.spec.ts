import { describe, expect, it } from 'vitest';
import { hIndex } from '../first';

describe('2023-11-04', () => {
  it('first', () => {
    const r = hIndex([3, 0, 6, 1, 5]);
    expect(r).toBe(3);
    const r1 = hIndex([100]);
    expect(r1).toBe(1);
    const r2 = hIndex([0]);
    expect(r2).toBe(0);
    const r3 = hIndex([0, 0]);
    expect(r3).toBe(0);
    // 突然发现自己理解错题目了
    const r4 = hIndex([11, 15]);
    expect(r4).toBe(2);
  });
});
