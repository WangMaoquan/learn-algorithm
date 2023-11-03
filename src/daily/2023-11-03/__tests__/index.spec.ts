import { describe, it, expect } from 'vitest';
import { maxProfit } from '../first';

describe('2023-11-03', () => {
  it('first', () => {
    const r = maxProfit([7, 1, 5, 3, 6, 4]);
    expect(r).toBe(5);
    const r1 = maxProfit([2, 1, 2, 1, 0, 1, 2]);
    expect(r1).toBe(2);
    const r2 = maxProfit([2, 4, 1]);
    expect(r2).toBe(2);
    const r3 = maxProfit([2, 11, 1, 4, 7]);
    expect(r3).toBe(9);
    const r4 = maxProfit([7, 11, 4, 2, 1]);
    expect(r4).toBe(4);
    const r5 = maxProfit([2, 2, 5]);
    expect(r5).toBe(3);
    const r6 = maxProfit([1, 2]);
    expect(r6).toBe(1);
    const r7 = maxProfit([3, 3, 5, 0, 0, 3, 1, 4]);
    expect(r7).toBe(4);
  });
});
